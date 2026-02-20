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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <ImageUpload onFileChange={setImageFile} />

      {/* Title */}
      <Input
        id="title"
        name="title"
        label="Title"
        type="text"
        placeholder="e.g. Gold Necklace"
        value={form.title}
        onChange={(e) => setField("title", e.target.value)}
        required
      />
      {/* Dropdowns row 1 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="jewellery_type"
          label="Jewellery type"
          options={JEWELLERY_TYPES}
          value={form.jewellery_type}
          onChange={(e) => setField("jewellery_type", e.target.value)}
        />
        <Select
          id="category"
          label="Category"
          options={CATEGORIES}
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
        />
      </div>

      {/* Dropdowns row 2 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          id="style"
          label="Style"
          options={STYLES}
          value={form.style}
          onChange={(e) => setField("style", e.target.value)}
        />
        <Select
          id="size"
          label="Size"
          options={SIZES}
          value={form.size}
          onChange={(e) => setField("size", e.target.value)}
        />
      </div>

      {/* Stock Available toggle */}
      <Toggle
        id="stockAvailable"
        label="Stock Available"
        checked={form.stockAvailable}
        onChange={(val) => setField("stockAvailable", val)}
      />

      {/* Make to order duration */}
      <InputWithSuffix
        id="makeToOrderDays"
        label="Make to order duration"
        type="number"
        min="0"
        placeholder="Enter here"
        suffix="days"
        value={form.makeToOrderDays}
        onChange={(e) => setField("makeToOrderDays", e.target.value)}
      />

      {/* Metal Purity */}
      <Select
        id="metalPurity"
        label="Metal Purity"
        options={METAL_PURITIES}
        value={form.metalPurity}
        onChange={(e) => setField("metalPurity", e.target.value)}
      />

      {/* Weights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InputWithSuffix
          id="netWeight"
          label="Net weight"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter here"
          suffix="g"
          value={form.netWeight}
          onChange={(e) => setField("netWeight", e.target.value)}
        />
        <InputWithSuffix
          id="grossWeight"
          label="Gross weight"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter here"
          suffix="g"
          value={form.grossWeight}
          onChange={(e) => setField("grossWeight", e.target.value)}
        />
        <InputWithSuffix
          id="stoneWeight"
          label="Stone weight"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter here"
          suffix="g"
          value={form.stoneWeight}
          onChange={(e) => setField("stoneWeight", e.target.value)}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-12 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        Continue
      </button>
    </form>
  );
}
