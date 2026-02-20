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
    <div className="w-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[400px] w-full cursor-pointer flex-col items-center justify-center border border-gray-200 bg-white transition-all duration-300 ease-out hover:border-gray-900 ${
          dragOver ? "border-gray-900 bg-gray-50 scale-[0.99]" : ""
        }`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain p-8"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-medium bg-white px-2 py-1 border border-gray-100">
                Click to change
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 px-4 text-center">
            <div className={`h-16 w-16 border border-gray-200 flex items-center justify-center rounded-none transition-colors ${dragOver ? 'border-gray-400' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="space-y-2">
              <p className="font-serif text-2xl text-gray-900 tracking-tight">
                Upload Product Image
              </p>
              <p className="text-sm text-gray-500 font-light tracking-wide">
                Drag and drop or click to browse
              </p>
            </div>
            <div className="flex gap-4 pt-4 opacity-40">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">JPGE</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">PNG</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">WEBP</span>
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
