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
  backgroundColor: "#f8f6f0", // celestique-cream
};

// ── Variant metadata ──────────────────────────────────────────────────────────
const VARIANTS = [
  { key: "v1", label: "Stone — Classic",    scene: "Dark navy-blue stone" },
  { key: "v2", label: "Velvet — Boutique",  scene: "Burgundy velvet cushion" },
  { key: "v3", label: "Marble — Editorial", scene: "White Carrara marble" },
  { key: "v4", label: "Charcoal — Dramatic",scene: "Deep charcoal gradient" },
];

// ── Stage definitions ─────────────────────────────────────────────────────────
const STAGES = [
  { key: "uploading",   label: "Upload",             icon: "↑" },
  { key: "processing",  label: "Bg Removal",         icon: "✂" },
  { key: "bg_removed",  label: "4 Variants",         icon: "✦" },
  { key: "saving",      label: "Saving",             icon: "↓" },
  { key: "done",        label: "Complete",           icon: "✓" },
];

const STAGE_INDEX = { uploading: 0, processing: 1, bg_removed: 2, saving: 3, done: 4 };

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner({ size = "md" }) {
  const sz = size === "sm" ? "w-4 h-4" : "w-12 h-12";
  return (
    <div className={`${sz} relative`}>
      <div className="absolute inset-0 border-t-2 border-[#FF1E1E] rounded-full animate-spin"></div>
      <div className="absolute inset-2 border-r-2 border-[#FF1E1E]/20 rounded-full animate-spin-slow"></div>
    </div>
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
            <div className="flex flex-col items-center gap-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-[10px] transition-all duration-700 border
                ${done    ? "bg-[#FF1E1E] text-white border-[#FF1E1E] shadow-[0_0_20px_rgba(255,30,30,0.3)]" : ""}
                ${active  ? "bg-white text-[#FF1E1E] border-[#FF1E1E] shadow-[0_0_25px_rgba(255,30,30,0.2)] animate-pulse" : ""}
                ${pending ? "bg-transparent text-celestique-dark/20 border-celestique-dark/10" : ""}
              `}>
                {done ? "✓" : s.icon}
              </div>
              <span className={`text-[8px] uppercase tracking-[0.3em] font-bold whitespace-nowrap transition-colors duration-500
                ${active ? "text-[#FF1E1E]" : done ? "text-celestique-dark" : "text-celestique-dark/20"}`}>
                {s.label}
              </span>
            </div>
            {i < STAGES.length - 1 && (
              <div className={`flex-1 h-[2px] mx-4 mb-7 transition-all duration-1000 ${i < current ? "bg-[#FF1E1E]" : "bg-celestique-dark/10"}`} />
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
    <div className="flex flex-col gap-5 group">
      {/* Header */}
      <div className="flex items-end justify-between min-h-12 border-b border-celestique-dark/5 pb-3">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-celestique-dark group-hover:text-[#FF1E1E] transition-colors">
            {variant.label}
          </span>
          <p className="text-[11px] text-celestique-dark/40 mt-1 font-serif italic tracking-tight">{variant.scene}</p>
        </div>
        {url && (
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#FF1E1E] font-bold">
            Verified
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[4/5] w-full bg-white border border-celestique-dark/5 overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700">
        {url ? (
          <img
            src={url}
            alt={variant.label}
            className="w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            <Spinner size="md" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-celestique-dark/30 font-bold animate-pulse">Rendering</span>
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
    <div className="w-full animate-in fade-in duration-1000 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── Stepper ── */}
        <div className="border-b border-celestique-dark/10 pb-12">
          <Stepper status={status} />
        </div>

        {/* ── Phase 1: uploading / processing — no images yet ── */}
        {!hasBgRemoved && !isDone ? (
          <div className="py-40 text-center space-y-12 relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[40vw] font-serif uppercase tracking-tighter italic leading-none">REVE</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-12">
              <Spinner size="md" />
              <div className="space-y-8">
                <h3 className="font-serif text-7xl md:text-8xl text-celestique-dark tracking-tighter italic leading-none">
                  {status === "uploading"
                    ? "Archiving Image."
                    : "Isolating Form."}
                </h3>
                <p className="text-celestique-dark/40 text-[10px] uppercase tracking-[0.5em] font-bold max-w-xs mx-auto">
                  {status === "uploading"
                    ? "COMMUNICATING WITH CELESTIQUE REVE SERVERS"
                    : "AI NEURAL ENGINE PROCESSING TEXTURES"}
                </p>
              </div>
            </div>
          </div>

        ) : (
          /* ── Phase 2+: bg_removed / saving / done — show images ── */
          <div className="space-y-32 animate-in fade-in slide-in-from-bottom-12 duration-1000">

            {/* ── Reve AI bg-removed preview ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
               <div className="lg:col-span-12 xl:col-span-4 space-y-8">
                  <div className="inline-block px-3 py-1 bg-[#FF1E1E] text-white text-[8px] uppercase tracking-[0.3em] font-bold">
                    PRIMARY ARCHIVE
                  </div>
                  <h3 className="text-6xl font-serif text-celestique-dark tracking-tighter italic leading-none">
                    Isolated <br/>Artifact.
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-celestique-dark/50 leading-relaxed font-medium">
                    The raw form has been successfully isolated. We are now weaving concurrently across four unique editorial environments.
                  </p>
               </div>
               
               <div className="lg:col-span-12 xl:col-span-8">
                  <div className="relative aspect-video bg-white border border-celestique-dark/5 shadow-2xl overflow-hidden group">
                     <div style={checkered} className="absolute inset-0 opacity-20" />
                     <img
                        src={bgRemovedUrl}
                        alt="Background removed"
                        className="relative z-10 w-full h-full object-contain p-20 grayscale hover:grayscale-0 transition-all duration-1000 brightness-110"
                     />
                  </div>
               </div>
            </div>

            {/* ── 4 variant panels ── */}
            <div className="space-y-16">
               <div className="flex items-end justify-between border-b border-celestique-dark/10 pb-8">
                  <h4 className="text-5xl font-serif text-celestique-dark tracking-tighter italic">Editorial Variants</h4>
                  <div className="flex flex-col items-end gap-3 text-right">
                     <span className="text-[9px] uppercase tracking-[0.3em] text-celestique-dark/40 font-bold italic">
                        {status === "done" ? "ARCHIVE COMPLETE" : "GENERATING SIMULTANEOUSLY"}
                     </span>
                     <div className="w-48 h-1 bg-celestique-dark/5 overflow-hidden">
                        <div 
                          className="h-full bg-[#FF1E1E] transition-all duration-1000 ease-out"
                          style={{ width: `${(doneCount / 4) * 100}%` }}
                        />
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
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
        <div className="border-t border-celestique-dark/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-12">
          {isDone ? (
            <>
              <div className="flex items-center gap-8">
                <div className="w-16 h-16 rounded-full bg-[#FF1E1E] flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(255,30,30,0.4)]">
                   ✓
                </div>
                <div>
                  <h5 className="text-3xl font-serif text-celestique-dark italic tracking-tight">Sequence Complete.</h5>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-celestique-dark/40 font-bold italic">ALL ASSETS ARE NOW ARCHIVED IN YOUR GLOBAL PORTFOLIO.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button
                  onClick={onReset}
                  className="px-12 py-5 border border-celestique-dark/10 text-[10px] uppercase tracking-[0.4em] font-bold text-celestique-dark hover:bg-celestique-dark hover:text-white transition-all duration-500"
                >
                  Upload Another
                </button>
                <a
                  href="/dashboard/my-uploads"
                  className="px-12 py-5 bg-[#FF1E1E] text-white text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-celestique-dark transition-all duration-500 shadow-xl"
                >
                  View Collection
                </a>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-6 group">
              <Spinner size="sm" />
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] uppercase tracking-[0.4em] text-celestique-dark font-bold animate-pulse">
                    {status === "saving" ? "Archiving Metadata" : "Synthesizing Environments"}
                 </span>
                 <span className="text-[9px] uppercase tracking-[0.2em] text-celestique-dark/30 font-bold">
                    ESTIMATED TIME REMAINING: {Math.max(10, (4 - doneCount) * 5)}s
                 </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
