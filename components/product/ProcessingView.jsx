"use client";

// ── Checkerboard CSS for transparent-background images ───────────────────────
const checkered = {
  backgroundImage: `
    linear-gradient(45deg, #e5e5e5 25%, transparent 25%),
    linear-gradient(-45deg, #e5e5e5 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e5e5e5 75%),
    linear-gradient(-45deg, transparent 75%, #e5e5e5 75%)
  `,
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
  backgroundColor: "#f5f5f5",
};

// ── Variant metadata ──────────────────────────────────────────────────────────
const VARIANTS = [
  { key: "v1", label: "Stone — Classic",    scene: "Dark navy-blue stone",       accent: "text-slate-600",  ring: "ring-slate-200"  },
  { key: "v2", label: "Velvet — Boutique",  scene: "Burgundy velvet cushion",     accent: "text-rose-600",   ring: "ring-rose-200"   },
  { key: "v3", label: "Marble — Editorial", scene: "White Carrara marble",        accent: "text-stone-600",  ring: "ring-stone-200"  },
  { key: "v4", label: "Charcoal — Dramatic",scene: "Deep charcoal gradient",      accent: "text-zinc-700",   ring: "ring-zinc-200"   },
];

// ── Stage definitions ─────────────────────────────────────────────────────────
const STAGES = [
  { key: "uploading",   label: "Upload",             icon: "⬆" },
  { key: "processing",  label: "Bg Removal",         icon: "✂" },
  { key: "bg_removed",  label: "4 Variants",         icon: "✦" },
  { key: "saving",      label: "Saving",             icon: "💾" },
  { key: "done",        label: "Complete",           icon: "✓" },
];

const STAGE_INDEX = { uploading: 0, processing: 1, bg_removed: 2, saving: 3, done: 4 };

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner({ size = "md" }) {
  const sz = size === "sm" ? "w-4 h-4 border-2" : "w-10 h-10 border-[3px]";
  return (
    <div className={`${sz} border-stone-200 border-t-amber-500 rounded-full animate-spin`} />
  );
}

// ── Progress stepper ──────────────────────────────────────────────────────────
function Stepper({ status }) {
  const current = STAGE_INDEX[status] ?? 0;
  return (
    <div className="flex items-center gap-0 w-full">
      {STAGES.map((s, i) => {
        const done    = i < current;
        const active  = i === current;
        const pending = i > current;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                ${done    ? "bg-emerald-500 text-white shadow-md"                                   : ""}
                ${active  ? "bg-amber-500 text-white shadow-md ring-4 ring-amber-100 animate-pulse" : ""}
                ${pending ? "bg-stone-100 text-stone-400"                                          : ""}
              `}>
                {done ? "✓" : s.icon}
              </div>
              <span className={`text-[9px] font-semibold uppercase tracking-wider whitespace-nowrap
                ${active ? "text-amber-600" : done ? "text-emerald-600" : "text-stone-300"}`}>
                {s.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`flex-1 h-px mx-1 mb-4 transition-all duration-700 ${i < current ? "bg-emerald-300" : "bg-stone-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Single variant panel ──────────────────────────────────────────────────────
function VariantPanel({ variant, url, index }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center justify-between min-h-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-500">
            {variant.label}
          </span>
          <p className="text-[9px] text-stone-400 mt-0.5">{variant.scene}</p>
        </div>
        {url && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[9px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            Done
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-stone-100 shadow-md">
        {url ? (
          <img
            src={url}
            alt={variant.label}
            className="w-full h-full object-contain p-4 transition-opacity duration-700"
          />
        ) : (
          <div className="w-full h-full bg-stone-50 flex flex-col items-center justify-center gap-2">
            <Spinner size="md" />
            <span className="text-[10px] text-stone-400 font-medium">Generating…</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function ProcessingView({ status, bgRemovedUrl, variantUrls = [], onReset }) {
  const isDone       = status === "done";
  const hasBgRemoved = !!bgRemovedUrl;
  const doneCount    = variantUrls.length;

  return (
    <div className="w-full animate-fade-in py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ── Stepper ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-6 py-5">
          <Stepper status={status} />
        </div>

        {/* ── Phase 1: uploading / processing — no images yet ── */}
        {!hasBgRemoved && !isDone ? (
          <div className="bg-white rounded-3xl border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-violet-100 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-amber-100 rounded-full blur-3xl opacity-30 animate-pulse delay-700" />
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-amber-50 animate-ping opacity-30" />
                <div className="relative w-full h-full rounded-full bg-white border border-stone-100 shadow-sm flex items-center justify-center">
                  <Spinner size="md" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-stone-900 tracking-tight">
                  {status === "uploading"
                    ? "Uploading your image…"
                    : "Removing background with Reve AI…"}
                </h3>
                <p className="text-stone-400 text-sm mt-2">
                  {status === "uploading"
                    ? "Sending your image to our pipeline."
                    : "Precisely cutting out the jewellery from the background."}
                </p>
              </div>
            </div>
          </div>

        ) : (
          /* ── Phase 2+: bg_removed / saving / done — show images ── */
          <div className="space-y-6">

            {/* ── Reve AI bg-removed preview ── */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Reve AI — Background Removed
                </span>
              </div>
              <div className="relative aspect-3/2 w-full max-w-xs mx-auto rounded-xl overflow-hidden border border-stone-100 shadow"
                style={checkered}>
                <img
                  src={bgRemovedUrl}
                  alt="Background removed"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            {/* ── 4 Nanobana variant panels ── */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${isDone ? "bg-amber-500" : "bg-amber-400 animate-pulse"}`} />
                    Nanobana AI — 4 Concurrent Variants
                  </span>
                </div>
                {!isDone && (
                  <span className="flex items-center gap-2 text-[11px] text-stone-400 font-medium">
                    <Spinner size="sm" />
                    Generating concurrently…
                  </span>
                )}
                {isDone && (
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {doneCount} / 4 generated
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {VARIANTS.map((v, i) => (
                  <VariantPanel
                    key={v.key}
                    variant={v}
                    url={variantUrls[i] ?? null}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Status bar / actions ── */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {isDone ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {doneCount} variant{doneCount !== 1 ? "s" : ""} saved to your catalogue
                  </p>
                  <p className="text-xs text-stone-400">Retailers can now see this product.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-wrap justify-end">
                {variantUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-100 text-stone-700 text-[10px] font-bold uppercase tracking-wider hover:bg-stone-200 transition-all"
                    title={`Download ${VARIANTS[i]?.label}`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    V{i + 1}
                  </a>
                ))}
                <button
                  onClick={onReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition-all"
                >
                  + Add Another
                </button>
              </div>
            </>
          ) : status === "saving" ? (
            <div className="flex items-center gap-3 text-stone-500 text-sm">
              <Spinner size="sm" />
              Saving metadata to catalogue…
            </div>
          ) : hasBgRemoved ? (
            <div className="flex items-center gap-3 text-stone-500 text-sm">
              <Spinner size="sm" />
              <span>
                <span className="font-semibold text-stone-700">Background removed.</span>{" "}
                Nanobana is concurrently generating all 4 styled variants…
              </span>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
