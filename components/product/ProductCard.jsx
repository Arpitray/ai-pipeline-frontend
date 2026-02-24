"use client";

import Image from "next/image";
import { useState } from "react";

const TYPE_ICONS = {
  necklace: "📿",
  ring: "💍",
  earrings: "✨",
  bracelet: "⌚",
  pendant: "🔮",
  bangles: "🔔",
  anklet: "🌸",
  brooch: "🌺",
};

const CATEGORY_COLORS = {
  gold:      "bg-amber-50 text-amber-700 border-amber-200",
  silver:    "bg-slate-50 text-slate-600 border-slate-200",
  diamond:   "bg-sky-50 text-sky-700 border-sky-200",
  platinum:  "bg-violet-50 text-violet-700 border-violet-200",
  gemstone:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  pearl:     "bg-rose-50 text-rose-600 border-rose-200",
};

// Labels matching the 4 backend variants (index-aligned)
const VARIANT_LABELS = [
  "Stone — Classic",
  "Velvet — Boutique",
  "Marble — Editorial",
  "Charcoal — Dramatic",
];

function Badge({ label, className = "" }) {
  if (!label) return null;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${className}`}
    >
      {label}
    </span>
  );
}

export function ProductCard({ product }) {
  const [imgError, setImgError]   = useState(false);
  const [expanded, setExpanded]   = useState(false);
  const [variantIdx, setVariantIdx] = useState(0);

  // Build variant list: prefer generated_image_urls, fall back to image_url / processed_image_url
  const variants = Array.isArray(product.generated_image_urls) && product.generated_image_urls.length > 0
    ? product.generated_image_urls
    : [product.image_url || product.processed_image_url || product.raw_image_url].filter(Boolean);

  const hasMultiple = variants.length > 1;
  const activeUrl   = variants[variantIdx] ?? null;
  const activeLabel = VARIANT_LABELS[variantIdx] ?? null;

  const typeIcon = TYPE_ICONS[product.jewellery_type] || "💎";
  const catColor =
    CATEGORY_COLORS[product.category] || "bg-stone-50 text-stone-600 border-stone-200";

  const specs = [
    { label: "Type",     value: product.jewellery_type },
    { label: "Category", value: product.category },
    { label: "Style",    value: product.style },
    { label: "Size",     value: product.size },
    { label: "Purity",   value: product.metal_purity },
    { label: "Net wt",   value: product.net_weight ? `${product.net_weight}g` : null },
    { label: "Gross wt", value: product.gross_weight ? `${product.gross_weight}g` : null },
    { label: "Stone wt", value: product.stone_weight ? `${product.stone_weight}g` : null },
  ].filter((s) => s.value);

  function prev(e) {
    e.stopPropagation();
    setVariantIdx((i) => (i - 1 + variants.length) % variants.length);
    setImgError(false);
  }
  function next(e) {
    e.stopPropagation();
    setVariantIdx((i) => (i + 1) % variants.length);
    setImgError(false);
  }

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        {activeUrl && !imgError ? (
          <img
            src={activeUrl}
            alt={activeLabel || product.title || product.jewellery_type || "Jewellery"}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-linear-to-br from-stone-100 to-amber-50">
            <span className="text-5xl">{typeIcon}</span>
            <span className="text-xs text-stone-400 font-medium">No image</span>
          </div>
        )}

        {/* Stock badge overlay */}
        <div className="absolute top-3 left-3">
          {product.stock_available ? (
            <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
              In Stock
            </span>
          ) : product.make_to_order_days ? (
            <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full shadow">
              Made to Order · {product.make_to_order_days}d
            </span>
          ) : null}
        </div>

        {/* ── Variant switcher overlay ── */}
        {hasMultiple && (
          <>
            {/* Prev / Next arrows — visible on hover */}
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm border border-stone-100 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous variant"
            >
              <svg className="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm border border-stone-100 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next variant"
            >
              <svg className="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators + current variant label */}
            <div className="absolute bottom-2 left-0 right-0 flex flex-col items-center gap-1.5">
              {activeLabel && (
                <span className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-[9px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  {activeLabel}
                </span>
              )}
              <div className="flex items-center gap-1">
                {variants.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setVariantIdx(i); setImgError(false); }}
                    className={`rounded-full transition-all duration-200 ${
                      i === variantIdx
                        ? "w-4 h-1.5 bg-white shadow"
                        : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`View variant ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Title + type icon */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif text-base font-semibold text-stone-900 leading-snug line-clamp-2">
              {product.title || `${product.jewellery_type ? product.jewellery_type.charAt(0).toUpperCase() + product.jewellery_type.slice(1) : "Jewellery"} Piece`}
            </h3>
            {product.wholesaler_email && (
              <p className="text-[11px] text-stone-400 mt-0.5 truncate">
                by {product.wholesaler_email}
              </p>
            )}
          </div>
          <span className="text-xl shrink-0 mt-0.5">{typeIcon}</span>
        </div>

        {/* Category badge */}
        <div className="flex flex-wrap gap-1.5">
          {product.category && (
            <Badge
              label={product.category}
              className={catColor}
            />
          )}
          {product.style && (
            <Badge
              label={product.style}
              className="bg-stone-50 text-stone-600 border-stone-200"
            />
          )}
        </div>

        {/* Specs — collapsible */}
        {specs.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <svg
                className={`w-3 h-3 transition-transform ${expanded ? "rotate-90" : ""}`}
                viewBox="0 0 20 20" fill="currentColor"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {expanded ? "Hide" : "View"} Details
            </button>

            {expanded && (
              <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                {specs.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="text-stone-400 uppercase tracking-wider">{s.label}</dt>
                    <dd className="font-medium text-stone-700 capitalize">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        {/* Footer: date */}
        <div className="mt-auto pt-2 border-t border-stone-50">
          <time className="text-[10px] text-stone-300">
            {new Date(product.created_at).toLocaleDateString("en-IN", {
              day: "numeric", month: "short", year: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
