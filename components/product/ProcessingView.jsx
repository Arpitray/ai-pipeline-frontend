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
  const stepIndex = status === "uploading" ? 0 : isDone ? 4 : 2;

  // Calculate progress percentage for a simple bar
  const progressPercent = Math.min((stepIndex + 1) * 25, 100);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 animate-fade-in">
      {!isDone ? (
        <div className="w-full max-w-sm space-y-12">
          {/* Minimal visualizer */}
          <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
             <div className="absolute inset-0 bg-gray-50 z-0"></div>
             {/* Subtle scanning line */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-900 animate-scan z-10 opacity-20"></div>
             <p className="relative z-20 font-serif text-2xl text-gray-900 tracking-tight">
                {status === "uploading" ? "Uploading" : "Refining"}
             </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Progress</span>
              <span className="text-xs font-mono text-gray-400">{progressPercent}%</span>
            </div>
            <div className="h-0.5 w-full bg-gray-100">
              <div 
                className="h-full bg-gray-900 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between pt-2">
               {steps.map((step, i) => (
                 <div key={step.key} className={`transition-opacity duration-300 ${i <= stepIndex ? 'opacity-100' : 'opacity-20'}`}>
                    <span className="text-[10px] uppercase tracking-widest text-gray-900">{step.label.split(" ")[0]}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl animate-fade-in-up">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white">
              {/* Image Result */}
              <div className="relative h-[500px] w-full bg-gray-50 border border-gray-100 p-8 flex items-center justify-center group overflow-hidden">
                <Image
                  src={processedUrl}
                  alt="Processed product"
                  fill
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Success Info */}
              <div className="flex flex-col justify-center space-y-8 p-4">
                 <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-green-600">Complete</span>
                    <h2 className="font-serif text-4xl text-gray-900 leading-tight">
                       Product enhanced successfully.
                    </h2>
                    <p className="text-gray-500 font-light max-w-sm">
                       The background has been removed and lighting adjusted for optimal catalogue presentation.
                    </p>
                 </div>

                 <div className="flex gap-4 pt-4">
                    <a
                      href={processedUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                    >
                      Download Asset
                    </a>
                    <button 
                      onClick={onReset} 
                      className="px-8 py-4 bg-white border border-gray-200 text-gray-900 text-xs font-bold uppercase tracking-widest hover:border-gray-900 transition-colors"
                    >
                      Process New
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
