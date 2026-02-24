"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

/**
 * Update the product row created by the backend pipeline with the form
 * metadata the user filled in (category, style, weights, stock, etc.).
 *
 * The backend already created the row (product_id) and will have written
 * generated_image_urls into it by the time the frontend calls this.
 * We do an UPDATE — not an INSERT — to avoid duplicates.
 */
export async function saveProduct(payload) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const {
    product_id,   // UUID created by backend POST /process
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
    raw_image_url,
  } = payload;

  const { error } = await supabase
    .from("products")
    .update({
      wholesaler_id:      user.id,
      wholesaler_email:   user.email,
      title,
      jewellery_type,
      category,
      style,
      size,
      stock_available:    !!stock_available,
      make_to_order_days: make_to_order_days ? parseInt(make_to_order_days) : null,
      metal_purity,
      net_weight:         net_weight  ? parseFloat(net_weight)  : null,
      gross_weight:       gross_weight ? parseFloat(gross_weight) : null,
      stone_weight:       stone_weight ? parseFloat(stone_weight) : null,
      raw_image_url,
    })
    .eq("id", product_id);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}
