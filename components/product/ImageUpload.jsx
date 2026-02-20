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
        className={`relative flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
          dragOver
            ? "border-gray-400 bg-gray-50"
            : "border-gray-300 bg-blue-50/50 hover:border-gray-400 hover:bg-gray-50"
        }`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Product preview"
              fill
              className="rounded-xl object-contain p-2"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm hover:bg-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-300 bg-white text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600">Click or drag to upload</p>
            <p className="text-xs text-gray-400">JPEG, PNG, WebP · max 10 MB</p>
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
