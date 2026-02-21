"use client";

import { useState } from "react";
import { Select } from "../ui/Select";
import { Toggle } from "../ui/Toggle";
import { Input } from "../ui/Input";
import { InputWithSuffix } from "../ui/InputWithSuffix";
import { ImageUpload } from "./ImageUpload";
import { ProcessingView } from "./ProcessingView";
import { processJewelleryImage } from "../../lib/api/products";
import { saveProduct } from "../../lib/actions/products";

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
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | saving | done | error
  const [processedUrl, setProcessedUrl] = useState(null);
  const [rawImageUrl, setRawImageUrl] = useState(null);
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
      const { product_id, processedUrl: url, rawImageUrl: raw } = await processJewelleryImage(
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

      // ── Save to Supabase ──────────────────────────────────
      setStatus("saving");
      const saveResult = await saveProduct({
        title:              form.title || JEWELLERY_TYPES.find((t) => t.value === form.jewellery_type)?.label || "Untitled",
        jewellery_type:     form.jewellery_type || null,
        category:           form.category || null,
        style:              form.style || null,
        size:               form.size || null,
        stock_available:    form.stockAvailable,
        make_to_order_days: form.makeToOrderDays || null,
        metal_purity:       form.metalPurity || null,
        net_weight:         form.netWeight || null,
        gross_weight:       form.grossWeight || null,
        stone_weight:       form.stoneWeight || null,
        raw_image_url:      raw || null,
        processed_image_url: url,
      });

      if (saveResult?.error) {
        // Non-blocking — product was processed, just log the save error
        console.error("[saveProduct]", saveResult.error);
      }

      setRawImageUrl(raw);
      setProcessedUrl(url);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setImageFile(null);
    setProcessedUrl(null);
    setRawImageUrl(null);
    setError(null);
    setStatus("idle");
  }

  const isProcessing = status === "uploading" || status === "processing" || status === "saving";

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
    <div className="max-w-5xl mx-auto rounded-3xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-stone-100 overflow-hidden">
      
      {/* Header with gradient subtle bg */}
      <div className="relative px-8 py-10 md:px-12 md:py-12 bg-linear-to-b from-stone-50 to-white border-b border-stone-100">
        <h2 className="text-3xl font-serif text-stone-900 tracking-tight">Add New Product</h2>
        <p className="text-stone-500 mt-2 text-lg font-light">Enter the details below to create a sparkling new listing.</p>
        
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-64 h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-50/40 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-16">
        
        {/* Section: Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-4 space-y-2">
             <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold">1</span>
               Product Image
             </h3>
             <p className="text-sm text-stone-500 leading-relaxed">
               Upload a high-quality image. Our AI will automatically enhance it and remove the background.
             </p>
           </div>
           <div className="lg:col-span-8">
             <ImageUpload onFileChange={setImageFile} />
           </div>
        </div>

        <div className="h-px w-full bg-stone-100"></div>

        {/* Section: Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-2">
             <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold">2</span>
               Essential Details
             </h3>
             <p className="text-sm text-stone-500 leading-relaxed">
               Define the core identity of your jewelry piece.
             </p>
          </div>
          
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-6">
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
        </div>

        <div className="h-px w-full bg-stone-100"></div>

        {/* Section: Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-2">
             <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
               <span className="flex items-center justify-center w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold">3</span>
               Specifications
             </h3>
             <p className="text-sm text-stone-500 leading-relaxed">
               Precise measurements and inventory details.
             </p>
          </div>

          <div className="lg:col-span-8 space-y-8">
            {/* Weights */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 bg-stone-50/50 p-6 rounded-2xl border border-stone-100">
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

            <div className="flex items-center justify-between p-5 rounded-xl border border-blue-100 bg-linear-to-r from-blue-50/80 to-indigo-50/80">
              <div className="flex flex-col gap-1">
                  <span className="text-stone-900 font-medium">Available in Stock</span>
                  <span className="text-xs text-stone-500">Is this piece ready for immediate shipment?</span>
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
                    helperText="Days required to manufacture this piece"
                  />
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50/50 p-4 animate-scaleIn">
            <div className="flex items-center gap-3">
               <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600">
                 <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                 </svg>
               </div>
               <div>
                 <h3 className="text-sm font-medium text-red-900">Submission Error</h3>
                 <p className="text-sm text-red-700 mt-0.5">{error}</p>
               </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-8 border-t border-stone-100 flex justify-end">
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center gap-3 h-14 px-8 rounded-full bg-stone-900 text-white text-lg font-medium shadow-xl hover:bg-stone-800 transition-all hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-stone-200"
          >
            <span>Create Product</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
