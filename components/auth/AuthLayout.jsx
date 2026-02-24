import Image from "next/image";
import Link from "next/link";

export function AuthLayout({ children, imageSrc, title, subtitle, footerText, footerLink, footerAction }) {
  return (
    <div className="flex min-h-screen w-full bg-celestique-cream overflow-hidden">
      
      {/* Left Side - Editorial Impact */}
      <div className="relative hidden w-1/2 md:block overflow-hidden bg-celestique-taupe/20">
        <Image
          src={imageSrc}
          alt="Editorial Jewelry"
          fill
          className="object-cover mix-blend-multiply opacity-90 transition-transform duration-[2s] hover:scale-105"
          priority
        />
        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-celestique-dark/20 to-transparent pointer-events-none" />
        
        {/* Floating Brand Badge */}
        <div className="absolute top-12 left-12 z-10">
          <Link href="/" className="text-xl font-serif tracking-tighter text-celestique-dark hover:opacity-70 transition-opacity">
            CELESTIQUE.
          </Link>
        </div>

        {/* Large Vertical Text */}
        <div className="absolute bottom-0 left-0 p-12 overflow-hidden pointer-events-none">
          <h2 className="text-[12vw] font-serif leading-none tracking-tighter text-celestique-dark/5 uppercase transform origin-bottom-left -rotate-90 md:rotate-0 translate-y-12 whitespace-nowrap">
            EXPLORE
          </h2>
        </div>
      </div>

      {/* Right Side - Vibrant Form */}
      <div className="flex w-full flex-col justify-center relative p-8 md:w-1/2 md:p-12 lg:p-24 bg-celestique-cream">
        
        {/* Subtle Background Text */}
        <div className="absolute top-0 right-0 p-12 overflow-hidden pointer-events-none opacity-[0.03]">
          <span className="text-[15vw] font-serif uppercase tracking-tighter leading-none">AUTH</span>
        </div>

        <div className="mx-auto w-full max-w-sm z-10">
          <header className="space-y-8 mb-16">
            <div className="inline-block px-3 py-1 bg-[#FF1E1E] text-celestique-cream text-[8px] uppercase tracking-[0.3em] font-bold">
              {subtitle.split(' ')[0]}
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-serif text-celestique-dark tracking-tighter uppercase leading-none italic">
                {title}.
              </h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-celestique-dark/50 font-medium">
                {subtitle}
              </p>
            </div>
          </header>

          <main className="relative">
            {children}
          </main>

          <footer className="mt-12 pt-8 border-t border-celestique-dark/10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-celestique-dark/60 text-center">
              {footerText}{" "}
              <Link
                href={footerLink}
                className="text-celestique-dark border-b border-[#FF1E1E] pb-0.5 hover:text-[#FF1E1E] transition-all font-bold"
              >
                {footerAction}
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
