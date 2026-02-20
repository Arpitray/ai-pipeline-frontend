"use client";

import { useState } from "react";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";
import { Input } from "../ui/Input";
import { InputWithSuffix } from "../ui/InputWithSuffix";
import { ImageUpload } from "./ImageUpload";
import { ProcessingView } from "./ProcessingView";
import { processJewelleryImage } from "../../lib/api/products";

const JEWELLERY_TYPES = [
  { value: "necklace", label: "Necklace" },
  { value: "ring", label: "Ring" },
  { value: "earrings", label: "Earrings" },
  { value: "bracelet", label: "Bracelet" },
  { value: "pendant", label: "Pendant" },
  { value: "bangles", label: "Bangles" },
  { value: "anklet", label: "Anklet" },
  { value: "brooch", label: "Brooch" },
];

const CATEGORIES = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "diamond", label: "Diamond" },
  { value: "platinum", label: "Platinum" },
  { value: "gemstone", label: "Gemstone" },
  { value: "pearl", label: "Pearl" },
];

const STYLES = [
  { value: "traditional", label: "Traditional" },
  { value: "modern", label: "Modern" },
  { value: "fusion", label: "Fusion" },
  { value: "antique", label: "Antique" },
  { value: "minimalist", label: "Minimalist" },
  { value: "bridal", label: "Bridal" },
];

const SIZES = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "freesize", label: "Free Size" },
];

const METAL_PURITIES = [
  { value: "24k", label: "24K (999)" },
  { value: "22k", label: "22K (916)" },
  { value: "18k", label: "18K (750)" },
  { value: "14k", label: "14K (585)" },
  { value: "925", label: "925 Silver" },
  { value: "950pt", label: "950 Platinum" },
];

const INITIAL_FORM = {
  jewellery_type: "",
  category: "",
  style: "",
  size: "",
  stockAvailable: false,
  makeToOrderDays: "",
  metalPurity: "",
  netWeight: "",
  grossWeight: "",
  stoneWeight: "",
  title: "",
};

export function AddProductForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | done | error
  const [processedUrl, setProcessedUrl] = useState(null);
  const [error, setError] = useState(null);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!imageFile) {
      setError("Please upload a product image.");
      window.scrollTo(0, 0);
      return;
    }
    setError(null);

    try {
      const { processedUrl: url } = await processJewelleryImage(
        {
          file: imageFile,
          title: form.jewellery_type
            ? JEWELLERY_TYPES.find((t) => t.value === form.jewellery_type)?.label
            : undefined,
          jewellery_type: form.jewellery_type || undefined,
        },
        {
          onStatusChange: setStatus,
        }
      );
      setProcessedUrl(url);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setImageFile(null);
    setProcessedUrl(null);
    setError(null);
    setStatus("idle");
  }

  const isProcessing = status === "uploading" || status === "processing";

  if (isProcessing || status === "done") {
    return (
      <ProcessingView
        status={status}
        processedUrl={processedUrl}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
      
      <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6">
        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Add New Product</h2>
        <p className="text-slate-500 text-sm mt-1">Fill in the details below to create a new listing.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-12">
        
        {/* Section: Media */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-medium text-slate-900">1. Product Image</h3>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Required</span>
          </div>
          <ImageUpload onFileChange={setImageFile} />
        </div>

        {/* Section: Basic Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-medium text-slate-900">2. Basic Details</h3>
             <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Required</span>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
             <Input
              id="title"
              name="title"
              label="Product Title"
              type="text"
              placeholder="e.g. Vintage Gold Necklace"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select
              id="jewellery_type"
              label="Type"
              options={JEWELLERY_TYPES}
              value={form.jewellery_type}
              onChange={(e) => setField("jewellery_type", e.target.value)}
            />
            <Select
              id="category"
              label="Material Category"
              options={CATEGORIES}
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Select
              id="style"
              label="Style Aesthetic"
              options={STYLES}
              value={form.style}
              onChange={(e) => setField("style", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
               <Select
                id="size"
                label="Size"
                options={SIZES}
                value={form.size}
                onChange={(e) => setField("size", e.target.value)}
              />
               <Select
                id="metalPurity"
                label="Purity"
                options={METAL_PURITIES}
                value={form.metalPurity}
                onChange={(e) => setField("metalPurity", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section: Specifications */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-base font-medium text-slate-900">3. Specifications</h3>
             <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Optional</span>
          </div>

          {/* Weights */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <InputWithSuffix
              id="netWeight"
              label="Net Weight"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              suffix="g"
              value={form.netWeight}
              onChange={(e) => setField("netWeight", e.target.value)}
            />
            <InputWithSuffix
              id="grossWeight"
              label="Gross Weight"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              suffix="g"
              value={form.grossWeight}
              onChange={(e) => setField("grossWeight", e.target.value)}
            />
            <InputWithSuffix
              id="stoneWeight"
              label="Stone Weight"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              suffix="g"
              value={form.stoneWeight}
              onChange={(e) => setField("stoneWeight", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between border border-slate-200 p-4 rounded-lg bg-slate-50/50">
             <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900">Stock Status</span>
                <span className="text-xs text-slate-500">Is this item currently in stock?</span>
             </div>
             <Toggle
              id="stockAvailable"
              label=""
              checked={form.stockAvailable}
              onChange={(val) => setField("stockAvailable", val)}
            />
          </div>

           {!form.stockAvailable && (
             <div className="animate-scaleIn origin-top">
                <InputWithSuffix
                  id="makeToOrderDays"
                  label="Production Time"
                  type="number"
                  min="0"
                  placeholder="e.g. 15"
                  suffix="days"
                  value={form.makeToOrderDays}
                  onChange={(e) => setField("makeToOrderDays", e.target.value)}
                />
             </div>
           )}

        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 animate-scaleIn">
            <div className="flex">
               <div className="flex-shrink-0">
                 <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                 </svg>
               </div>
               <div className="ml-3">
                 <h3 className="text-sm font-medium text-red-800">{error}</h3>
               </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-6 border-t border-slate-100">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Product
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
