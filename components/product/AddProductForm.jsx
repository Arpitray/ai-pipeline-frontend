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
  const [status, setStatus] = useState("idle"); // idle | uploading | processing | bg_removed | saving | done | error
  const [variantUrls, setVariantUrls] = useState([]); // up to 4 Nanobana variant URLs
  const [rawImageUrl, setRawImageUrl] = useState(null);
  const [bgRemovedUrl, setBgRemovedUrl] = useState(null);
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
      const { product_id, variantUrls: variants, rawImageUrl: raw } = await processJewelleryImage(
        {
          file: imageFile,
          title: form.title ||
            (form.jewellery_type
              ? JEWELLERY_TYPES.find((t) => t.value === form.jewellery_type)?.label
              : undefined),
          jewellery_type: form.jewellery_type || undefined,
        },
        {
          onStatusChange: setStatus,
          onBgRemoved: setBgRemovedUrl,
        }
      );

      // ── Update Supabase row with form metadata ────────────
      // The backend already created the row — we UPDATE it with
      // the wholesaler's details and the extra form fields.
      setStatus("saving");
      const saveResult = await saveProduct({
        product_id,
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
      });

      if (saveResult?.error) {
        // Non-blocking — product was processed, just log the save error
        console.error("[saveProduct]", saveResult.error);
      }

      setRawImageUrl(raw);
      setVariantUrls(variants);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setImageFile(null);
    setVariantUrls([]);
    setRawImageUrl(null);
    setBgRemovedUrl(null);
    setError(null);
    setStatus("idle");
  }

  const isProcessing = status === "uploading" || status === "processing" || status === "bg_removed" || status === "saving";

  if (isProcessing || status === "done") {
    return (
      <ProcessingView
        status={status}
        bgRemovedUrl={bgRemovedUrl}
        variantUrls={variantUrls}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="px-6 py-20 text-center space-y-8">
        <div className="inline-block px-3 py-1 bg-[#FF1E1E] text-celestique-cream text-[8px] uppercase tracking-[0.3em] font-bold">
           CREATOR STUDIO
        </div>
        <h2 className="text-6xl md:text-8xl font-serif text-celestique-dark tracking-tighter leading-none italic">Add Piece.</h2>
        <p className="text-celestique-dark/50 text-[10px] uppercase tracking-[0.3em] max-w-sm mx-auto font-medium">
           DOCUMENT YOUR ARTISTRY. OUR AI WILL HANDLE THE EDITORIAL PRESENTATION.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-celestique-cream border border-celestique-dark/10 p-8 md:p-20 space-y-24 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Decorative Text */}
        <div className="absolute top-0 right-0 p-12 overflow-hidden pointer-events-none opacity-[0.02]">
          <span className="text-[20vw] font-serif uppercase tracking-tighter leading-none">NEW</span>
        </div>

        {/* Section: Media */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
           <div className="lg:col-span-5 space-y-6">
             <div className="flex items-center gap-4">
                <span className="w-10 h-px bg-celestique-dark/20"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF1E1E]">01 MEDIA</span>
             </div>
             <h3 className="text-4xl font-serif text-celestique-dark leading-tight tracking-tight">
               Studio <br/>Photography
             </h3>
             <p className="text-[11px] uppercase tracking-[0.15em] text-celestique-dark/50 leading-relaxed font-medium">
               Upload a high-quality capture. We generate four high-end editorial backgrounds automatically.
             </p>
           </div>
           <div className="lg:col-span-7">
             <div className="shadow-2xl border border-celestique-dark/5 p-2 bg-white/50">
               <ImageUpload onFileChange={setImageFile} />
             </div>
           </div>
        </div>

        {/* Section: Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <div className="lg:col-span-5 space-y-6">
             <div className="flex items-center gap-4">
                <span className="w-10 h-px bg-celestique-dark/20"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF1E1E]">02 IDENTITY</span>
             </div>
             <h3 className="text-4xl font-serif text-celestique-dark leading-tight tracking-tight">
               Essential <br/>Attributes
             </h3>
             <p className="text-[11px] uppercase tracking-[0.15em] text-celestique-dark/50 leading-relaxed font-medium">
               A piece is defined by its material, its purpose, and its soul.
             </p>
          </div>
          
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <Input
                id="title"
                name="title"
                label="Product Title"
                type="text"
                placeholder="E.G. CELESTIAL GOLD BAND"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              <Select
                id="jewellery_type"
                label="Jewellery Type"
                options={JEWELLERY_TYPES}
                value={form.jewellery_type}
                onChange={(e) => setField("jewellery_type", e.target.value)}
              />
              <Select
                id="category"
                label="Core Material"
                options={CATEGORIES}
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
              <Select
                id="style"
                label="Aesthetic Style"
                options={STYLES}
                value={form.style}
                onChange={(e) => setField("style", e.target.value)}
              />
              <div className="grid grid-cols-2 gap-8">
                <Select
                  id="size"
                  label="Dimmension"
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

        {/* Section: Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <div className="lg:col-span-5 space-y-6">
             <div className="flex items-center gap-4">
                <span className="w-10 h-px bg-celestique-dark/20"></span>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FF1E1E]">03 DATA</span>
             </div>
             <h3 className="text-4xl font-serif text-celestique-dark leading-tight tracking-tight">
               Technical <br/>Specifications
             </h3>
             <p className="text-[11px] uppercase tracking-[0.15em] text-celestique-dark/50 leading-relaxed font-medium">
               Precise measurements for archival clarity and client trust.
             </p>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {/* Weights */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 bg-white/40 p-10 border border-celestique-dark/5 shadow-inner">
              <InputWithSuffix
                id="netWeight"
                label="Net Weight"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                suffix="G"
                value={form.netWeight}
                onChange={(e) => setField("netWeight", e.target.value)}
              />
              <InputWithSuffix
                id="grossWeight"
                label="Gross"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                suffix="G"
                value={form.grossWeight}
                onChange={(e) => setField("grossWeight", e.target.value)}
              />
              <InputWithSuffix
                id="stoneWeight"
                label="Stones"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                suffix="G"
                value={form.stoneWeight}
                onChange={(e) => setField("stoneWeight", e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between p-8 border border-celestique-dark/10 bg-white/20">
              <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-celestique-dark font-bold italic">Available In Portfolio</span>
                  <span className="text-[9px] uppercase tracking-[0.1em] text-celestique-dark/40 font-medium">Ready for immediate client selection?</span>
              </div>
              <Toggle
                id="stockAvailable"
                label=""
                checked={form.stockAvailable}
                onChange={(val) => setField("stockAvailable", val)}
              />
            </div>

            {!form.stockAvailable && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <InputWithSuffix
                    id="makeToOrderDays"
                    label="Crafting Period"
                    type="number"
                    min="0"
                    placeholder="14"
                    suffix="DAYS"
                    value={form.makeToOrderDays}
                    onChange={(e) => setField("makeToOrderDays", e.target.value)}
                  />
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="border-l-4 border-[#FF1E1E] bg-[#FF1E1E]/5 p-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-6">
               <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-[#FF1E1E]/20 text-[#FF1E1E] font-serif text-xl italic">
                 !
               </div>
               <div>
                 <h3 className="text-[10px] uppercase tracking-[0.3em] text-[#FF1E1E] font-bold">Registry Error</h3>
                 <p className="text-[11px] uppercase tracking-[0.1em] text-[#FF1E1E]/70 mt-1 font-medium">{error}</p>
               </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-16 border-t border-celestique-dark/10 flex justify-end items-center gap-12">
          <p className="text-[9px] uppercase tracking-[0.4em] text-celestique-dark/30 font-bold hidden md:block">
            VERIFY DETAILS · CELESTIQUE REVE SYSTEM
          </p>
          <button
            type="submit"
            className="group relative inline-flex items-center justify-center gap-8 px-14 py-6 bg-celestique-dark text-celestique-cream text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#FF1E1E] transition-all duration-500 shadow-2xl active:scale-[0.98]"
          >
            <span>Publish Piece</span>
            <span className="text-lg transition-transform group-hover:translate-x-3">&rarr;</span>
          </button>
        </div>
      </form>
    </div>
  );
}
