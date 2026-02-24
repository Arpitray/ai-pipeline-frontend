import { getAllProducts } from "../lib/api/supabase-products";
import { createClient } from "../lib/supabase/server";
import { ProductCard } from "../components/product/ProductCard";
import { SignOutButton } from "../components/auth/SignOutButton";
import Link from "next/link";

export const metadata = {
  title: "Celestique | Timeless Jewelry",
  description: "A celestial touch for timeless moments.",
};

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-celestique-cream text-celestique-dark font-sans selection:bg-celestique-dark selection:text-celestique-cream">
      
      {/* ── Header ── */}
      <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between text-[10px] uppercase tracking-[0.1em] font-medium border-b border-celestique-border/30">
        <div className="flex items-center gap-6">
          <span className="opacity-60">STUDIO CELESTIQUE</span>
        </div>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="hidden sm:block opacity-60">{user.email}</span>
              <SignOutButton />
            </>
          ) : (
            <Link href="/signin" className="hover:opacity-70 transition-opacity">
              [ SIGN IN ]
            </Link>
          )}
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">
        
        {/* Massive Title */}
        <div className="w-full text-center relative z-20 pointer-events-none">
          <h1 className="font-serif text-[22vw] leading-none tracking-tighter text-celestique-dark mix-blend-darken">
            CELESTIQUE
          </h1>
        </div>

        {/* Hero Image Area */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
           <div className="relative w-[90vw] h-[85vh] overflow-hidden">
             <img 
               src="https://i.pinimg.com/1200x/6b/3e/df/6b3edf04c585bf6fd426457f7ea8c51b.jpg" 
               alt="Hero Jewelry" 
               className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 hover:scale-105"
             />
           </div>
        </div>

        {/* Sub-text below hero image */}
        <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex justify-between items-end z-30 text-[10px] uppercase tracking-[0.2em] font-medium text-celestique-dark/60">
          <p className="max-w-[250px] leading-relaxed">
            Handcrafted unique jewelry, with soul.<br/>Designed for the modern aesthetic.
          </p>
          <Link href="#products" className="group flex items-center gap-4 border-b border-current pb-2 hover:text-celestique-dark transition-colors">
            Discover the Collection <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* ── Philosophy Section ── */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            [ our philosophy ]
          </span>
          <h2 className="font-sans text-2xl md:text-4xl font-medium leading-snug tracking-tight uppercase">
            EVERY PIECE IS MORE THAN AN ACCESSORY.
            IT IS LIVING ENERGY, ENCLOSED IN FORM,
            CREATED TO INSPIRE, SURPRISE,
            AND REMIND US THAT WE ARE PART OF SOMETHING GREATER.
          </h2>
        </div>

        {/* Editorial Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-24 max-w-5xl mx-auto">
          <div className="aspect-square bg-celestique-taupe/30 flex items-center justify-center overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop" 
               alt="Editorial Hand" 
               className="w-full h-full object-cover mix-blend-multiply"
             />
          </div>
          <div className="aspect-square bg-celestique-taupe/30 flex items-center justify-center overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1887&auto=format&fit=crop" 
               alt="Editorial Model" 
               className="w-full h-full object-cover mix-blend-multiply"
             />
          </div>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section id="products" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-celestique-border/30">
        
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-24">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">
            [ our creations ]
          </span>
          <h2 className="font-sans text-2xl md:text-3xl font-medium leading-snug tracking-tight uppercase">
            RINGS CREATED BY THE INSPIRATION OF NATURE —
            TEXTURES OF ROCKS, BARK OF TREES, AND FORMS
            CREATED BY TIME.
          </h2>
          <p className="text-[11px] uppercase tracking-[0.1em] opacity-60 max-w-md mx-auto leading-relaxed">
            We use natural minerals and strive to preserve the feeling of naturalness and significance in every ring.
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-celestique-border/30">
            <span className="font-serif text-4xl text-celestique-dark/40 mb-4">No pieces yet</span>
            <p className="text-[10px] tracking-[0.1em] uppercase opacity-60">
              Our artisans are currently crafting new designs.
            </p>
          </div>
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-celestique-border/30 py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[0.1em] font-medium">
        <div className="text-2xl font-serif tracking-tighter">CELESTIQUE</div>
        <div className="flex gap-8 mt-6 md:mt-0 opacity-60">
          <Link href="#" className="hover:opacity-100 transition-opacity">Instagram</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Telegram</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
