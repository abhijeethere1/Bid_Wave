import { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/api";
import ImageUpload from "../components/sell/ImageUpload";
import ItemDetails from "../components/sell/ItemDetails";
import SizeSelector from "../components/sell/SizeSelector";
import PricingSection from "../components/sell/PricingSection";

const DELIVERY_FEES = { Small: 80, Medium: 150, Large: 400, Extra: null };

export default function SellItem() {
  const [images, setImages] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    size: "",
    startingPrice: "",
    duration: "",
  });

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ── AI Description Generator ──
  const handleAIGenerate = async (imageObj) => {
    setAiLoading(true);
    try {
      // Convert image to base64
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(imageObj.file);
      });

      // Get media type
      const mediaType = imageObj.file.type || "image/jpeg";

      // Call our backend (not Claude directly)
      const response = await api.post("/ai/describe", {
        imageBase64: base64,
        mediaType,
      });
      const result = response.data;

      // Auto fill the form
      if (result.title) updateForm("title", result.title);
      if (result.description) updateForm("description", result.description);
      if (result.category) updateForm("category", result.category);
      if (result.suggestedPrice && !form.startingPrice) {
        updateForm("startingPrice", result.suggestedPrice);
      }

      toast.success("AI filled in your listing details!");
    } catch (err) {
      console.error("AI error:", err);
      toast.error("AI generation failed. Please fill in manually.");
    }
    setAiLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const deliveryFee = DELIVERY_FEES[form.size];

  if (submitted)
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            Auction Listed!
          </h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Your item is now live. Buyers can start bidding immediately.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                title: "",
                description: "",
                category: "",
                size: "",
                startingPrice: "",
                duration: "",
              });
              setImages([]);
            }}
            className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-all"
          >
            List Another Item
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8 ml-2">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            List an Item
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Upload a photo and let AI fill the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <ImageUpload
            onImagesChange={setImages}
            onAIGenerate={handleAIGenerate}
            aiLoading={aiLoading}
          />

          {/* AI Loading Banner */}
          {aiLoading && (
            <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl px-4 py-3">
              <Sparkles
                size={16}
                className="text-orange-500 animate-pulse shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  AI is analyzing your photo...
                </p>
                <p className="text-xs text-orange-400 dark:text-orange-500 mt-0.5">
                  This usually takes 3-5 seconds
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 dark:border-gray-800" />
          <ItemDetails form={form} onChange={updateForm} />

          <div className="border-t border-gray-100 dark:border-gray-800" />
          <SizeSelector
            value={form.size}
            onChange={(v) => updateForm("size", v)}
          />

          <div className="border-t border-gray-100 dark:border-gray-800" />
          <PricingSection form={form} onChange={updateForm} />

          {/* Summary */}
          {form.startingPrice && form.size && form.duration && (
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 space-y-3">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                Listing Summary
              </p>
              {[
                {
                  label: "Starting Price",
                  value: `₹${parseInt(form.startingPrice).toLocaleString("en-IN")}`,
                },
                {
                  label: "Delivery Fee",
                  value: deliveryFee ? `₹${deliveryFee}` : "Custom quote",
                },
                {
                  label: "Duration",
                  value: new Date(form.duration).toLocaleString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between"
                >
                  <p className="text-xs text-gray-400">{row.label}</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all"
          >
            List Item for Auction
          </button>
        </form>
      </div>
    </div>
  );
}
