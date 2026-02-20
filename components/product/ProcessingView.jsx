"use client";

import Image from "next/image";
import { Button } from "../ui/Button";

const steps = [
  { key: "uploading", label: "Uploading image" },
  { key: "processing", label: "AI background removal" },
  { key: "processing2", label: "Scene compositing" },
  { key: "done", label: "Finalising" },
];

export function ProcessingView({ status, processedUrl, onReset }) {
  const isDone = status === "done";
  const stepIndex = status === "uploading" ? 0 : isDone ? 4 : 1;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-12">
      {!isDone ? (
        <>
          {/* Spinner */}
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg
              className="absolute inset-0 h-full w-full animate-spin text-gray-200"
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" />
            </svg>
            <svg
              className="absolute inset-0 h-full w-full animate-spin text-gray-900"
              style={{ animationDuration: "1.2s" }}
              viewBox="0 0 48 48"
              fill="none"
            >
              <path
                d="M24 4a20 20 0 0120 20"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs font-semibold text-gray-500">
              {status === "uploading" ? "↑" : "AI"}
            </span>
          </div>

          <div className="text-center">
            <p className="text-base font-semibold text-gray-900">
              {status === "uploading" ? "Uploading your image…" : "AI is enhancing your product…"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This typically takes 15 – 60 seconds. Please don&apos;t close this page.
            </p>
          </div>

          {/* Step progress */}
          <div className="w-full max-w-xs space-y-2">
            {steps.map((step, i) => (
              <div key={step.key} className="flex items-center gap-3">
                <div
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    i < stepIndex
                      ? "bg-gray-900 text-white"
                      : i === stepIndex
                      ? "border-2 border-gray-900 text-gray-900 animate-pulse"
                      : "border border-gray-300 text-gray-400"
                  }`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm ${
                    i <= stepIndex ? "text-gray-800 font-medium" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 text-xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Processing complete!</h2>
            <p className="text-sm text-gray-500">Your AI-enhanced product image is ready.</p>
          </div>

          {/* Processed image */}
          <div className="relative h-72 w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
            <Image
              src={processedUrl}
              alt="Processed product"
              fill
              className="object-contain p-4"
              unoptimized
            />
          </div>

          <div className="flex gap-3">
            <a
              href={processedUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-gray-900 px-6 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Download
            </a>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-11 items-center gap-2 rounded-md border border-gray-300 bg-white px-6 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Add another
            </button>
          </div>
        </>
      )}
    </div>
  );
}
