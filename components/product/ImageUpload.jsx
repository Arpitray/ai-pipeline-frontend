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
        className={`relative flex min-h-[450px] w-full cursor-pointer flex-col items-center justify-center bg-celestique-taupe/10 transition-all duration-300 ease-out border ${
          dragOver 
            ? "border-celestique-dark bg-celestique-taupe/20" 
            : "border-celestique-taupe hover:border-celestique-dark"
        }`}
      >
        {preview ? (
          <>
            <div className="relative w-full h-full min-h-[450px] p-8 flex items-center justify-center overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[400px] w-auto object-contain transition-transform duration-700 hover:scale-105 mix-blend-multiply"
              />
            </div>
            
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-6 right-6 z-20 p-3 bg-celestique-cream border border-celestique-dark text-celestique-dark hover:bg-celestique-dark hover:text-celestique-cream transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <span className="bg-celestique-dark text-celestique-cream text-[9px] uppercase tracking-[0.2em] px-6 py-3">
                 Click or drop to replace
               </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-8 px-8 text-center max-w-sm mx-auto">
            <div className={`h-20 w-20 border border-celestique-dark flex items-center justify-center transition-all duration-500 ${dragOver ? 'bg-celestique-dark text-celestique-cream' : 'bg-transparent text-celestique-dark group-hover:bg-celestique-dark group-hover:text-celestique-cream'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-[1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-4">
              <p className="font-serif text-2xl text-celestique-dark">
                Upload Product Photo
              </p>
              <p className="text-celestique-dark/60 text-xs uppercase tracking-[0.1em] leading-relaxed">
                Drag & drop your jewelry piece here, or click to browse files.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-6">
               <span className="text-[9px] tracking-[0.2em] text-celestique-dark uppercase py-1.5 px-3 border border-celestique-taupe">JPG</span>
               <span className="text-[9px] tracking-[0.2em] text-celestique-dark uppercase py-1.5 px-3 border border-celestique-taupe">PNG</span>
               <span className="text-[9px] tracking-[0.2em] text-celestique-dark uppercase py-1.5 px-3 border border-celestique-taupe">WEBP</span>
            </div>
          </div>
        )}
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
