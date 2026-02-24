import { createClient } from "../supabase/server";

/**
 * Fetch all products from Supabase (public — no auth required).
 * Returns newest-first.
 */
export async function getAllProducts() {
  const supabase = await createClient();

  let data, error;
  try {
    ({ data, error } = await supabase
      .from("products")
      .select(
        `id,
       title,
       jewellery_type,
       category,
       style,
       size,
       stock_available,
       make_to_order_days,
       metal_purity,
       net_weight,
       gross_weight,
       stone_weight,
       image_url,
       generated_image_urls,
       raw_image_url,
       wholesaler_email,
       created_at`
      )
      .not("image_url", "is", null)
      .order("created_at", { ascending: false }));
  } catch (fetchErr) {
    console.error("[getAllProducts] Network error (Supabase unreachable):", fetchErr.message);
    return [];
  }

  if (error) {
    console.error("[getAllProducts]", error.message);
    return [];
  }

  return data ?? [];
}
