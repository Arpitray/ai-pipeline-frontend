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
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-medium">
            <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <span className="w-6 h-[1px] bg-current block"></span>
              Menu
            </button>
          </div>
          
          <div className="flex items-center gap-6 text-xs tracking-[0.2em] uppercase font-medium">
            {user ? (
              <>
                <span className="hidden sm:block opacity-60">{user.email}</span>
                <SignOutButton />
              </>
            ) : (
              <Link href="/signin" className="hover:opacity-70 transition-opacity">
                Sign In
              </Link>
            )}
            <button className="hover:opacity-70 transition-opacity">Cart (0)</button>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen bg-celestique-taupe pt-32 pb-20 px-6 md:px-12 flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col">
          
          {/* Massive Title */}
          <div className="text-center mt-8 md:mt-16 mb-12 md:mb-24">
            <h1 className="font-serif text-[12vw] leading-[0.85] tracking-tight text-celestique-cream mix-blend-overlay opacity-90">
              CELESTIQUE
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-8 z-10">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-4">COLLECTION<br/>2025</h2>
                <p className="text-sm leading-relaxed opacity-80 max-w-xs">
                  Discover exquisite jewelry inspired by the beauty of the heavens. Each piece is crafted to bring elegance and grace to your most cherished occasions.
                </p>
              </div>
              <div>
                <Link href="#products" className="inline-flex items-center gap-3 bg-celestique-dark text-celestique-cream px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:bg-black transition-colors">
                  Discover <span className="text-lg leading-none">&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Center Image Area (Placeholder for the hand/jewelry image) */}
            <div className="lg:col-span-4 relative h-[50vh] lg:h-full min-h-[400px] flex items-center justify-center">
               {/* In a real app, this would be an optimized next/image */}
               <div className="absolute inset-0 bg-gradient-to-t from-celestique-taupe via-transparent to-transparent z-10"></div>
               <div className="w-full h-full bg-celestique-cream/20 rounded-t-full overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-celestique-dark/30 font-serif text-xl">
                    [ Hero Image ]
                  </div>
               </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-4 flex flex-col justify-center items-end text-right z-10">
              <h3 className="font-serif text-2xl md:text-3xl mb-16 max-w-[250px]">
                A CELESTIAL TOUCH FOR TIMELESS MOMENTS
              </h3>
              
              <nav className="w-full max-w-[280px] flex flex-col">
                {['Rings', 'Earrings', 'Necklaces', 'Bracelets'].map((item, i) => (
                  <Link key={item} href={`#${item.toLowerCase()}`} className="group flex items-center justify-between py-4 border-b border-celestique-border/40 text-xs tracking-[0.2em] uppercase hover:border-celestique-dark transition-colors">
                    <span>{item}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                  </Link>
                ))}
              </nav>
            </div>

          </div>
        </div>
      </section>

      {/* ── About Us Section ── */}
      <section className="py-32 px-6 md:px-12 bg-celestique-cream">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 space-y-10">
            <h2 className="font-serif text-7xl md:text-8xl lg:text-[9rem] leading-[0.85] text-celestique-taupe opacity-60">
              ABOUT<br/>US
            </h2>
            
            <div className="space-y-6 text-sm leading-relaxed max-w-md">
              <p>
                We carefully select the finest materials—precious metals, sparkling gemstones, and luxurious pearls—to create each piece. Every design is meticulously crafted by skilled artisans, ensuring that each item is not only beautiful but built to last.
              </p>
              <p>
                Our commitment to excellence is reflected in every detail, from the intricate designs to the flawless finish. At Celestique, we are dedicated to creating jewelry that transcends trends, offering pieces that will remain cherished for generations.
              </p>
              <p>
                Whether you're celebrating love, marking a special occasion, or simply treating yourself, we invite you to explore our collection and experience the celestial elegance that defines us.
              </p>
            </div>

            <div>
              <Link href="/about" className="inline-flex items-center gap-3 bg-celestique-dark text-celestique-cream px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-medium hover:bg-black transition-colors">
                More About Us <span className="text-lg leading-none">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] w-full max-w-md ml-auto bg-celestique-taupe/30 rounded-tl-full rounded-tr-full overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-celestique-dark/30 font-serif text-xl">
                  [ Editorial Image ]
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Products Section ── */}
      <section id="products" className="py-32 px-6 md:px-12 bg-celestique-taupe">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-20">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] text-celestique-cream mix-blend-overlay opacity-80">
              OUR PRODUCTS
            </h2>
          </div>

          {/* Category Headers */}
          <div className="grid grid-cols-2 gap-8 mb-12 border-b border-celestique-border/40 pb-4">
            <h3 className="font-serif text-2xl">RINGS <span className="text-lg">&rarr;</span></h3>
            <h3 className="font-serif text-2xl">EARRINGS <span className="text-lg">&rarr;</span></h3>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-celestique-border/30 rounded-3xl">
              <span className="font-serif text-4xl text-celestique-dark/40 mb-4">No pieces yet</span>
              <p className="text-sm tracking-[0.1em] uppercase opacity-60">
                Our artisans are currently crafting new designs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-celestique-dark text-celestique-cream py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="font-serif text-4xl mb-6">CELESTIQUE</h2>
            <p className="text-sm opacity-70 max-w-xs leading-relaxed">
              A celestial touch for timeless moments. Crafted with passion, worn with grace.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6 opacity-50">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Collections</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">About Us</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Journal</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-6 opacity-50">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Terms of Service</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs opacity-50">
          <p>&copy; {new Date().getFullYear()} Celestique. All rights reserved.</p>
          <p>Designed for elegance.</p>
        </div>
      </footer>
    </div>
  );
}
