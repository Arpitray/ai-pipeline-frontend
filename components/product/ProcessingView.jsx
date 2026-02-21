"use client";

import Image from "next/image";

const steps = [
  { key: "uploading", label: "Uploading Image" },
  { key: "processing", label: "Removing Background" },
  { key: "processing2", label: "Adjusting Lightning" },
  { key: "done", label: "Assets Ready" },
];

export function ProcessingView({ status, processedUrl, onReset }) {
  const isDone = status === "done";
  const stepIndex =
    status === "uploading" ? 0 :
    status === "processing" ? 2 :
    status === "saving" ? 3 :
    isDone ? 4 : 2;

  const progressPercent = Math.min((stepIndex + 1) * 25, 100);

  const statusLabel =
    status === "uploading" ? "Uploading Media" :
    status === "saving" ? "Saving to Catalogue…" :
    "Enhancing Product";

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 xs:p-12 animate-fade-in w-full">
      {!isDone ? (
        <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-stone-100 p-8 md:p-12 text-center space-y-10 relative overflow-hidden">
          
          {/* Decorative Gradient Blob */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-violet-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-40 animate-pulse delay-700"></div>

          <div className="relative z-10 space-y-6">
             <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-stone-100 rounded-full animate-ping opacity-20"></div>
                <div className="relative w-full h-full bg-white rounded-full border border-stone-100 shadow-sm flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
                </div>
             </div>
             
             <div className="space-y-2">
                <h3 className="font-serif text-2xl text-stone-900 tracking-tight">
                  {statusLabel}
                </h3>
                <p className="text-stone-500 text-sm">Please wait while we prepare your assets.</p>
             </div>
          </div>

          <div className="relative z-10 space-y-3">
             <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-stone-400">
                <span>Progress</span>
                <span>{progressPercent}%</span>
             </div>
             <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div 
                   className="h-full bg-linear-to-r from-stone-800 to-stone-600 rounded-full transition-all duration-700 ease-out"
                   style={{ width: `${progressPercent}%` }}
                ></div>
             </div>
          </div>

        </div>
      ) : (
        <div className="w-full max-w-5xl animate-scale-in">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Image Result */}
              <div className="relative aspect-square w-full bg-white rounded-3xl border border-stone-100 shadow-xl overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-stone-50 to-white -z-10"></div>
                <Image
                  src={processedUrl}
                  alt="Processed product"
                  fill
                  className="object-contain p-8 md:p-16 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                  unoptimized
                />
              </div>

              {/* Success Info */}
              <div className="flex flex-col justify-center space-y-8">
                 <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 w-fit">
                       <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       <span className="text-xs font-bold uppercase tracking-widest text-green-700">Processing Complete</span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl text-stone-900 leading-[1.1] tracking-tight">
                       Your product is ready <br/> for the spotlight.
                    </h2>
                    <p className="text-stone-500 text-lg font-light leading-relaxed max-w-md">
                       We've removed the background and optimized the lighting. It's now ready for your catalogue.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href={processedUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-stone-900 text-white text-sm font-bold uppercase tracking-widest shadow-lg hover:bg-stone-800 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                      Download Asset
                    </a>
                    <button 
                      onClick={onReset} 
                      className="inline-flex justify-center items-center px-8 py-4 rounded-xl bg-white border border-stone-200 text-stone-900 text-sm font-bold uppercase tracking-widest hover:border-stone-400 hover:bg-stone-50 transition-all"
                    >
                      Process Another
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
