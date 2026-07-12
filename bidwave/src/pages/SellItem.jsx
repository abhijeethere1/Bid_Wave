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
  const [loading, setLoading] = useState(false);
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

  const handleAIGenerate = async (imageObj) => {
    setAiLoading(true);
    try {
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(imageObj.file);
      });
      const response = await api.post("/ai/describe", {
        imageBase64: base64,
        mediaType: imageObj.file.type || "image/jpeg",
      });
      const result = response.data;
      if (result.title) updateForm("title", result.title);
      if (result.description) updateForm("description", result.description);
      if (result.category) updateForm("category", result.category);
      if (result.suggestedPrice && !form.startingPrice) {
        updateForm("startingPrice", result.suggestedPrice);
      }
      toast.success("AI filled in your listing details!");
    } catch (err) {
      toast.error("AI generation failed. Please fill in manually.");
    }
    setAiLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.category ||
      !form.size ||
      !form.startingPrice ||
      !form.duration
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const imageUrls = [];
      for (const img of images) {
        const base64 = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result.split(",")[1]);
          reader.onerror = rej;
          reader.readAsDataURL(img.file);
        });
        const uploadRes = await api.post("/upload", {
          imageBase64: base64,
          mediaType: img.file.type || "image/jpeg",
        });
        imageUrls.push(uploadRes.data.url);
      }
      await api.post("/auctions", {
        title: form.title,
        description: form.description,
        category: form.category,
        size: form.size,
        starting_price: parseInt(form.startingPrice),
        ends_at: new Date(form.duration).toISOString(),
        images: imageUrls,
      });
      toast.success("Auction listed successfully!");
      setSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to list auction");
    }
    setLoading(false);
  };

  const deliveryFee = DELIVERY_FEES[form.size];

  if (submitted)
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-[#FAF9F6] dark:bg-[#121212]">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 bg-[#2E8B57]/10 dark:bg-[#4EBA75]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle
              size={32}
              className="text-[#2E8B57] dark:text-[#4EBA75]"
            />
          </div>
          <h2 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            Auction Listed!
          </h2>
          <p className="text-[#737373] dark:text-[#A0A0A0] text-sm mt-2 leading-relaxed">
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
            className="mt-6 px-6 py-3 bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_4px_24px_rgba(75,0,130,0.25)]"
          >
            List Another Item
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8 ml-2">
          <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            List an Item
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0] mt-1">
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
            <div className="flex items-center gap-3 bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 border border-[#4B0082]/15 dark:border-[#9D4EDD]/20 rounded-xl px-4 py-3">
              <Sparkles
                size={16}
                className="text-[#4B0082] dark:text-[#9D4EDD] animate-pulse shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[#4B0082] dark:text-[#9D4EDD]">
                  AI is analyzing your photo...
                </p>
                <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-0.5">
                  This usually takes 3-5 seconds
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10" />
          <ItemDetails form={form} onChange={updateForm} />

          <div className="border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10" />
          <SizeSelector
            value={form.size}
            onChange={(v) => updateForm("size", v)}
          />

          <div className="border-t border-[#4B0082]/8 dark:border-[#9D4EDD]/10" />
          <PricingSection form={form} onChange={updateForm} />

          {/* Summary */}
          {form.startingPrice && form.size && form.duration && (
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#D4AF37]/20 dark:border-[#FFD700]/15 rounded-2xl p-5 space-y-3 shadow-[0_2px_12px_rgba(212,175,55,0.08)]">
              <p className="text-sm font-bold text-[#1A1A1A] dark:text-[#E0E0E0] mb-1">
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
                  label: "Ends At",
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
                  <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                    {row.label}
                  </p>
                  <p className="text-xs font-semibold text-[#1A1A1A] dark:text-[#E0E0E0]">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 disabled:opacity-60 text-[#1A1A1A] font-bold text-sm rounded-xl shadow-[0_4px_24px_rgba(212,175,55,0.30)] transition-all duration-200"
          >
            {loading ? "Listing..." : "List Item for Auction"}
          </button>
        </form>
      </div>
    </div>
  );
}
