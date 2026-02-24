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
          end: "+=150%", // How long the pinning/animation lasts
          scrub: 1,      // Smooth scrubbing
          pin: true,     // Pin the section while animating
          anticipatePin: 1,
        },
      });

      // Initial state: Image is small and rounded
      // Animation: Scale up to fill the viewport and remove border radius
      tl.to(imageRef.current, {
        width: "100vw",
        height: "100vh",
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: "0px",
        scale: 1,
        ease: "none",
      })
      .to(titleRef.current, {
        y: -150,
        opacity: 0,
        scale: 0.8,
        ease: "none",
      }, 0) // Run title animation alongside image scale
      .to(contentRef.current, {
        opacity: 0,
        y: 50,
        ease: "none",
      }, 0);

      // Add a slight parallax or scale to the image itself inside the container
      gsap.fromTo(
        imageRef.current.querySelector("img"),
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-celestique-cream"
    >
      {/* Massive Title - Vibrant Red */}
      <div 
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none select-none"
      >
        <h1 className="font-serif text-[18vw] leading-none tracking-tighter text-[#FF1E1E] uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
          CELESTIQUE.
        </h1>
      </div>

      {/* Hero Image Area - Starts small, grows to full screen */}
      <div 
        ref={imageRef} 
        className="relative w-[60vw] h-[50vh] max-w-6xl z-10 overflow-hidden bg-celestique-taupe/10 rounded-2xl shadow-2xl transition-shadow duration-700"
      >
         <img 
           src="https://i.pinimg.com/1200x/6b/3e/df/6b3edf04c585bf6fd426457f7ea8c51b.jpg" 
           alt="Hero Jewelry" 
           className="w-full h-full object-cover mix-blend-multiply opacity-90"
         />
      </div>

      {/* Sub-text and Discovery Link */}
      <div 
        ref={contentRef}
        className="absolute bottom-12 w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end z-30 gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-celestique-dark/60"
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
