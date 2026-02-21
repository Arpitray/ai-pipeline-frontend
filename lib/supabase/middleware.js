import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — do NOT remove this line
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Helper: build redirect URL ──────────────────────────────
  function redirect(dest) {
    const url = request.nextUrl.clone();
    url.pathname = dest;
    return NextResponse.redirect(url);
  }

  // ── 1. Protect dashboard routes — wholesalers only ──────────
  if (pathname.startsWith("/dashboard")) {
    if (!user) return redirect("/signin");

    const role = user.user_metadata?.role;

    // No role yet (e.g. Google OAuth) → pick a role first
    if (!role) return redirect("/select-role");

    // Retailers should NOT access the wholesaler dashboard
    if (role === "retailer") return redirect("/");
  }

  // ── 2. Protect select-role — must be logged in ───────────────
  if (pathname.startsWith("/select-role") && !user) {
    return redirect("/signin");
  }

  // ── 3. Auth pages — redirect authenticated users ─────────────
  const authRoutes = ["/signin", "/signup"];
  if (authRoutes.includes(pathname) && user) {
    const role = user.user_metadata?.role;
    if (!role) return redirect("/select-role");
    if (role === "wholesaler") return redirect("/dashboard/add-product");
    return redirect("/");
  }

  return supabaseResponse;
}
