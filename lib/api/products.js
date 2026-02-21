const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_BUCKET = "plant-images";
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 300_000; // 5 minutes

/**
 * Derive the Reve bg-removed intermediate URL from a product ID.
 * Path: products/temp/reve_{id}.png
 */
function reveUrl(productId) {
  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/products/temp/reve_${productId}.png`;
}

/**
 * Derive the final Nanobana-processed URL from a product ID.
 * Path: products/processed/{id}.png
 */
export function processedUrl(productId) {
  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/products/processed/${productId}.png`;
}

/**
 * HEAD-probe a Supabase public URL.
 * Returns true as soon as the file exists (HTTP 200).
 */
async function probeUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
export async function uploadProduct({ file, title, jewellery_type }) {
  const formData = new FormData();
  formData.append("file", file);
  if (title) formData.append("title", title);
  if (jewellery_type) formData.append("jewellery_type", jewellery_type);

  const res = await fetch(`${API_BASE}/process`, {
    method: "POST",
    body: formData,
    // Do NOT set Content-Type — browser sets it with the correct boundary
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg =
      res.status === 413 ? "File exceeds 10 MB limit." :
      res.status === 415 ? "Unsupported file type. Use JPEG, PNG or WebP." :
      body.detail ?? `Upload failed (${res.status})`;
    throw new Error(msg);
  }

  return res.json(); // { message, product_id, raw_image_url }
}

/**
 * Fetch the current product record.
 */
export async function getProduct(productId) {
  const res = await fetch(`${API_BASE}/product/${productId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Product fetch failed (${res.status})`);
  return res.json();
}

/**
 * Poll until the final processed image appears in Supabase storage.
 * Also HEAD-probes the Reve temp URL on each tick — fires onBgRemoved
 * the first time the bg-removed intermediate file exists.
 *
 * @param {string} productId
 * @param {string} rawImageUrl — used as a fallback completion check
 * @param {(product: object) => void} onTick
 * @param {(url: string) => void} onBgRemoved
 */
export async function pollForResult(productId, rawImageUrl, onTick, onBgRemoved) {
  const deadline      = Date.now() + POLL_TIMEOUT_MS;
  const reveTempUrl   = reveUrl(productId);
  const finalUrl      = processedUrl(productId);
  let bgRemovedFired  = false;

  while (Date.now() < deadline) {
    await sleep(POLL_INTERVAL_MS);

    // ── 1. Check Reve intermediate (bg-removed) via HEAD probe ──
    if (!bgRemovedFired) {
      const exists = await probeUrl(reveTempUrl);
      if (exists) {
        bgRemovedFired = true;
        onBgRemoved?.(reveTempUrl);
      }
    }

    // ── 2. Check final processed image via HEAD probe ────────────
    const finalExists = await probeUrl(finalUrl);
    if (finalExists) {
      // Also tick the product record so callers can read metadata
      try {
        const product = await getProduct(productId);
        onTick?.(product);
      } catch { /* non-fatal */ }
      return finalUrl;
    }

    // ── 3. Fallback: check product record image_url field ────────
    try {
      const product = await getProduct(productId);
      onTick?.(product);
      if (product.image_url && product.image_url !== rawImageUrl) {
        return product.image_url;
      }
    } catch { /* keep polling */ }
  }

  throw new Error("Timed out waiting for processed image (5 min). Please retry.");
}

/**
 * Full pipeline: upload → poll → return processed URL.
 * Callbacks:
 *   onStatusChange(state)  — 'uploading' | 'processing' | 'bg_removed' | 'error'
 *   onBgRemoved(url)       — fired once when Reve's bg-removed image appears in storage
 *   onTick(product)        — fired on every poll cycle
 */
export async function processJewelleryImage(payload, { onStatusChange, onBgRemoved, onTick } = {}) {
  onStatusChange?.("uploading");
  const { product_id, raw_image_url } = await uploadProduct(payload);

  onStatusChange?.("processing");
  const finalProcessedUrl = await pollForResult(
    product_id,
    raw_image_url,
    onTick,
    (bgUrl) => {
      onBgRemoved?.(bgUrl);
      onStatusChange?.("bg_removed");
    }
  );

  // Caller inserts the "saving" step before setting "done"
  return {
    product_id,
    processedUrl:  finalProcessedUrl,
    rawImageUrl:   raw_image_url,
    reveImageUrl:  reveUrl(product_id), // always available after bg_removed fires
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
