import { getAllProducts } from "../lib/api/supabase-products";
import { createClient } from "../lib/supabase/server";
import { ProductCard } from "../components/product/ProductCard";
import { SignOutButton } from "../components/auth/SignOutButton";
import Link from "next/link";

export const metadata = {
  title: "Jewellery Catalogue — Browse All Designs",
  description: "Discover the finest handcrafted jewellery from verified wholesalers.",
};

// Revalidate every 60 seconds so new products appear without a hard deploy
export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-[#fafaf8]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 2h11l4 6-9.5 14L2.5 8l4-6z" />
              </svg>
            </div>
            <span className="font-serif text-lg font-semibold text-stone-900 tracking-tight">
              Jeweller
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="hidden sm:block text-xs text-stone-400 border-r border-stone-200 pr-3">
                  {user.email}
                </span>
                <SignOutButton />
              </>
            ) : (
              <Link
                href="/signin"
                className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-linear-to-br from-stone-900 via-stone-800 to-amber-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.15)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(251,191,36,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Verified Wholesalers Only
            </p>
            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight text-white">
              Discover the finest<br />
              <span className="text-amber-400">jewellery designs</span>
            </h1>
            <p className="mt-4 text-stone-300 text-lg font-light leading-relaxed max-w-xl">
              Browse thousands of handcrafted pieces directly from verified wholesalers.
              Source authentically, retail confidently.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-stone-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                {products.length} piece{products.length !== 1 ? "s" : ""} available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catalogue ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-stone-900">
              All Products
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              {products.length > 0
                ? `Showing ${products.length} product${products.length !== 1 ? "s" : ""}`
                : "No products listed yet — check back soon."}
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-stone-700">No products yet</h3>
            <p className="text-stone-400 text-sm mt-2 max-w-xs">
              Wholesalers haven&apos;t uploaded products yet. Check back soon!
            </p>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 2h11l4 6-9.5 14L2.5 8l4-6z" />
              </svg>
            </div>
            <span className="font-serif text-sm font-medium text-stone-600">Jeweller</span>
          </div>
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Jeweller. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
