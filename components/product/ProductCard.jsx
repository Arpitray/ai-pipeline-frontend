"use client";

import { useState } from "react";

export function ProductCard({ product }) {
  const [imgError, setImgError]   = useState(false);
  const [variantIdx, setVariantIdx] = useState(0);

  // Build variant list: prefer generated_image_urls, fall back to image_url / processed_image_url
  const variants = Array.isArray(product.generated_image_urls) && product.generated_image_urls.length > 0
    ? product.generated_image_urls
    : [product.image_url || product.processed_image_url || product.raw_image_url].filter(Boolean);

  const hasMultiple = variants.length > 1;
  const activeUrl   = variants[variantIdx] ?? null;

  function prev(e) {
    e.preventDefault();
    setVariantIdx((i) => (i - 1 + variants.length) % variants.length);
    setImgError(false);
  }
  function next(e) {
    e.preventDefault();
    setVariantIdx((i) => (i + 1) % variants.length);
    setImgError(false);
  }

  return (
    <article className="group flex flex-col">
      {/* ── Image ── */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-celestique-taupe/20 mb-6">
        {activeUrl && !imgError ? (
          <img
            src={activeUrl}
            alt={product.title || product.jewellery_type || "Jewellery"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-celestique-dark/30">
            <span className="font-serif text-xl">No Image</span>
          </div>
        )}

        {/* Stock badge overlay */}
        <div className="absolute top-4 left-4">
          {product.stock_available ? (
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-celestique-dark bg-celestique-cream/80 backdrop-blur-md px-3 py-1.5 rounded-full">
              In Stock
            </span>
          ) : product.make_to_order_days ? (
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-celestique-dark bg-celestique-cream/80 backdrop-blur-md px-3 py-1.5 rounded-full">
              Made to Order
            </span>
          ) : null}
        </div>

        {/* ── Variant switcher overlay ── */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-celestique-cream/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-celestique-cream text-celestique-dark"
              aria-label="Previous variant"
            >
              &larr;
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-celestique-cream/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-celestique-cream text-celestique-dark"
              aria-label="Next variant"
            >
              &rarr;
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {variants.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setVariantIdx(i); setImgError(false); }}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === variantIdx ? "bg-celestique-dark" : "bg-celestique-dark/30 hover:bg-celestique-dark/60"
                  }`}
                  aria-label={`View variant ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col items-center text-center px-2">
        <h3 className="font-serif text-xl text-celestique-dark mb-2 line-clamp-1">
          {product.title || `${product.jewellery_type ? product.jewellery_type.charAt(0).toUpperCase() + product.jewellery_type.slice(1) : "Jewellery"} Piece`}
        </h3>
        
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-celestique-dark/60">
          {product.category && <span>{product.category}</span>}
          {product.category && product.style && <span>&middot;</span>}
          {product.style && <span>{product.style}</span>}
        </div>
        
        {product.wholesaler_email && (
          <p className="text-[9px] tracking-[0.1em] uppercase text-celestique-dark/40 mt-3">
            By {product.wholesaler_email.split('@')[0]}
          </p>
        )}
      </div>
    </article>
  );
}
