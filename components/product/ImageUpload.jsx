"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function ImageUpload({ onFileChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileChange(file);
  }

  function handleInputChange(e) {
    handleFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleRemove(e) {
    e.stopPropagation();
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="w-full h-full relative group">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[500px] w-full cursor-pointer flex-col items-center justify-center bg-white transition-all duration-700 ease-out border-2 border-dashed ${
          dragOver 
            ? "border-[#FF1E1E] bg-[#FF1E1E]/5 scale-[0.98]" 
            : "border-celestique-dark/10 group-hover:border-[#FF1E1E]/30"
        }`}
      >
        {preview ? (
          <div className="relative w-full h-full min-h-[500px] p-12 flex items-center justify-center overflow-hidden animate-in fade-in duration-1000">
            <img
              src={preview}
              alt="Preview"
              className="max-h-[450px] w-auto object-contain transition-all duration-1000 grayscale group-hover:grayscale-0 brightness-110"
            />
            
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-10 right-10 z-20 w-12 h-12 flex items-center justify-center bg-white border border-celestique-dark/10 text-celestique-dark hover:bg-[#FF1E1E] hover:text-white transition-all duration-500 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="absolute inset-0 bg-celestique-dark/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
               <div className="px-8 py-4 bg-[#FF1E1E] text-celestique-cream text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl">
                  Replace Archive
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-10 px-8 text-center max-w-md mx-auto relative z-10">
            <div className={`h-24 w-24 border border-celestique-dark/10 flex items-center justify-center transition-all duration-700 ${dragOver ? 'bg-[#FF1E1E] text-white border-[#FF1E1E]' : 'bg-transparent text-celestique-dark/20 group-hover:border-[#FF1E1E] group-hover:text-[#FF1E1E]'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="space-y-6">
              <p className="font-serif text-4xl text-celestique-dark italic tracking-tighter">
                {dragOver ? "Release to Begin." : "Upload Studio Capture."}
              </p>
              <p className="text-celestique-dark/40 text-[10px] uppercase tracking-[0.3em] font-bold leading-relaxed max-w-[280px] mx-auto">
                HIGH-RESOLUTION RAW IMAGERY PREFERRED FOR AI EDITORIAL GENERATION.
              </p>
            </div>
            
            <div className="pt-8 flex flex-col items-center gap-4">
               <div className="h-px w-12 bg-[#FF1E1E]/20"></div>
               <p className="text-[9px] tracking-[0.4em] text-[#FF1E1E] uppercase font-bold">
                 Drag & Drop or click to browse
               </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center px-2 mt-4 opacity-50">
        <div className="flex gap-6">
           {['JPG', 'PNG', 'WEBP'].map(ext => (
             <span key={ext} className="text-[8px] uppercase tracking-[0.3em] font-bold text-celestique-dark">
               {ext}
             </span>
           ))}
        </div>
        <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-celestique-dark">
           MAX 10MB · 4K READY
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  );
}
