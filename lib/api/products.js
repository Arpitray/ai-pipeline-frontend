const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 300_000; // 5 minutes

/**
 * Upload image + metadata, returns { product_id, raw_image_url }
 */
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
 * Poll until image_url changes from raw_image_url (processing complete).
 * Calls onTick on every poll so the UI can show elapsed time.
 */
export async function pollForResult(productId, rawImageUrl, onTick) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;

  while (Date.now() < deadline) {
    await sleep(POLL_INTERVAL_MS);
    const product = await getProduct(productId);
    onTick?.(product);

    if (product.image_url && product.image_url !== rawImageUrl) {
      return product.image_url; // processed URL ready
    }
  }

  throw new Error("Timed out waiting for processed image (5 min). Please retry.");
}

/**
 * Full pipeline: upload → poll → return processed URL.
 * onStatusChange(state) where state is 'uploading' | 'processing' | 'done' | 'error'
 */
export async function processJewelleryImage(payload, { onStatusChange, onTick } = {}) {
  onStatusChange?.("uploading");
  const { product_id, raw_image_url } = await uploadProduct(payload);

  onStatusChange?.("processing");
  const processedUrl = await pollForResult(product_id, raw_image_url, onTick);

  // Note: we do NOT call onStatusChange("done") here so the caller can
  // insert a "saving" step before transitioning to done.
  return { product_id, processedUrl, rawImageUrl: raw_image_url };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
