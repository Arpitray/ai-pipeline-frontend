"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for the hero scroll interaction
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%", // Slightly shorter to feel faster
          scrub: 0.5,     // Snappier scrub
          pin: true,     // Pin the section while animating
          anticipatePin: 1,
        },
      });

      // Using clip-path is significantly more performant than width/height
      // Initial state: inset card
      // Final state: full screen
      tl.fromTo(imageRef.current, 
        { 
          clipPath: "inset(20% 15% 20% 15% round 32px)",
          scale: 0.9,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
          duration: 1,
          ease: "none",
        }
      )
      .to(titleRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.5,
      }, 0) // Title disappears quickly as image grows
      .to(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.4,
      }, 0);

      // Simple parallax on the image internal
      tl.to(imageRef.current.querySelector("img"), {
        scale: 1.2,
        ease: "none",
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-celestique-cream"
    >
      {/* Massive Title - Vibrant Red */}
      <div 
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none will-change-transform"
      >
        <h1 className="font-serif text-[18vw] leading-none font-bold tracking-tighter text-[#FF1E1E] uppercase drop-shadow-2xl">
          CELESTIQUE.
        </h1>
      </div>

      {/* Hero Image Area - Controlled by clip-path for performance */}
      <div 
        ref={imageRef} 
        className="absolute inset-0 z-10 overflow-hidden bg-celestique-taupe/10 will-change-[clip-path,transform]"
      >
         <img 
           src="https://i.pinimg.com/1200x/6b/3e/df/6b3edf04c585bf6fd426457f7ea8c51b.jpg" 
           alt="Hero Jewelry" 
           className="w-full h-full object-cover mix-blend-multiply opacity-90 will-change-transform"
         />
      </div>

      {/* Sub-text and Discovery Link */}
      <div 
        ref={contentRef}
        className="absolute bottom-12 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end z-30 gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-celestique-dark/60 will-change-transform"
      >
        <div className="max-w-[300px] space-y-4">
          <span className="block text-[8px] opacity-40">[ ESTABLISHED 2025 ]</span>
          <p className="leading-relaxed text-celestique-dark">
            Handcrafted unique jewelry, with soul. Designed for the modern aesthetic and the timeless spirit.
          </p>
        </div>
        <Link 
          href="#products" 
          className="group flex items-center gap-4 border-b border-celestique-dark/20 pb-2 hover:border-celestique-dark transition-all duration-500"
        >
          Discover the Collection <span className="text-xl transition-transform group-hover:translate-x-2">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
