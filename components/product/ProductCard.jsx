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
  const [imgError, setImgError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const imageUrl = product.processed_image_url || product.raw_image_url;
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

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={product.title || product.jewellery_type || "Jewellery"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
