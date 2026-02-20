import { createClient } from "../../../lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // "next" param allows post-login redirects e.g. /dashboard/add-product
  const next = searchParams.get("next") ?? "/dashboard/add-product";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // On error, redirect to signin with error flag
  return NextResponse.redirect(`${origin}/signin?error=oauth`);
}
