import { createClient } from "../../../lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // After exchanging the code, check the user's role
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Try metadata first (fastest — from JWT)
      let role = user?.user_metadata?.role;

      // Fallback: query profiles table in case metadata is outdated
      if (!role && user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        role = profile?.role;
      }

      if (role === "wholesaler") {
        return NextResponse.redirect(`${origin}/dashboard/add-product`);
      }
      if (role === "retailer") {
        return NextResponse.redirect(`${origin}/`);
      }

      // No role yet (first Google sign-in) → pick a role
      return NextResponse.redirect(`${origin}/select-role`);
    }
  }

  // On error, redirect to signin with error flag
  return NextResponse.redirect(`${origin}/signin?error=oauth`);
}
