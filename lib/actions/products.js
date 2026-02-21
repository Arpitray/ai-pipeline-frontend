"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";

/**
 * Save a fully-processed product to Supabase.
 * Called from AddProductForm after image processing completes.
 */
export async function saveProduct(payload) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const {
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
    processed_image_url,
  } = payload;

  const { error } = await supabase.from("products").insert({
    wholesaler_id: user.id,
    wholesaler_email: user.email,
    title,
    jewellery_type,
    category,
    style,
    size,
    stock_available: !!stock_available,
    make_to_order_days: make_to_order_days ? parseInt(make_to_order_days) : null,
    metal_purity,
    net_weight: net_weight ? parseFloat(net_weight) : null,
    gross_weight: gross_weight ? parseFloat(gross_weight) : null,
    stone_weight: stone_weight ? parseFloat(stone_weight) : null,
    raw_image_url,
    processed_image_url,
  });

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}
