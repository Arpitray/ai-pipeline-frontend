import { createClient } from "../supabase/server";

/**
 * Fetch all products from Supabase (public — no auth required).
 * Returns newest-first.
 */
export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
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
       processed_image_url,
       raw_image_url,
       wholesaler_email,
       created_at`
    )
    .not("processed_image_url", "is", null) // only show fully-processed items
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllProducts]", error.message);
    return [];
  }

  return data ?? [];
}
