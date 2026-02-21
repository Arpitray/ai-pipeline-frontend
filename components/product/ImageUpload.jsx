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
        className={`absolute -inset-0.5 bg-linear-to-r from-stone-200 to-stone-300 rounded-2xl blur opacity-30 transition duration-1000 group-hover:opacity-70 group-hover:duration-200 ${dragOver ? 'opacity-100 from-violet-400 to-indigo-400 blur-lg' : ''}`}></div>
      
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[450px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-white transition-all duration-300 ease-out border-2 ${
          dragOver 
            ? "border-violet-500 bg-violet-50/50 scale-[0.99] shadow-inner" 
            : "border-stone-100 hover:border-stone-300 hover:bg-stone-50/30"
        }`}
      >
        {preview ? (
          <>
            <div className="relative w-full h-full min-h-[450px] p-4 flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[400px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur shadow-lg border border-stone-100 text-stone-600 hover:text-red-500 transition-all hover:scale-110 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="bg-stone-900/80 backdrop-blur-md text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg">
                 Click or drop to replace
               </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 px-8 text-center max-w-sm mx-auto">
            <div className={`h-24 w-24 rounded-full flex items-center justify-center transition-all duration-300 ${dragOver ? 'bg-violet-100 text-violet-600 scale-110' : 'bg-stone-50 text-stone-400 group-hover:bg-stone-100 group-hover:scale-110'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="space-y-3">
              <p className="font-serif text-2xl text-stone-900 font-medium">
                Upload Product Photo
              </p>
              <p className="text-stone-500 font-light text-base leading-relaxed">
                Drag & drop your jewelry piece here, or click to browse files.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4">
               <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase py-1 px-2 border border-stone-200 rounded">JPG</span>
               <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase py-1 px-2 border border-stone-200 rounded">PNG</span>
               <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase py-1 px-2 border border-stone-200 rounded">WEBP</span>
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
