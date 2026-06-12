import { useState } from "react";
import { Sparkles, CheckCircle } from "lucide-react";
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

  // AI Description Generator
  const handleAIGenerate = async (imageObj) => {
    setAiLoading(true);
    try {
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(imageObj.file);
      });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 500,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg",
                    data: base64,
                  },
                },
                {
                  type: "text",
                  text: `You are helping a seller list an item on an auction platform. Analyze this image and respond ONLY with a JSON object like this:
{
  "title": "concise product title",
  "description": "2-3 sentence description mentioning condition, key features, and what makes it valuable",
  "category": "one of: Electronics, Accessories, Furniture, Home Decor, Sports, Fashion, Books, Other"
}
No extra text, just the JSON.`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content[0].text;
      const parsed = JSON.parse(text);
      updateForm("title", parsed.title);
      updateForm("description", parsed.description);
      updateForm("category", parsed.category);
    } catch (err) {
      console.error("AI error:", err);
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            List an Item
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Fill in the details below. Upload a photo and let AI fill the rest.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <ImageUpload
            onImagesChange={setImages}
            onAIGenerate={handleAIGenerate}
            aiLoading={aiLoading}
          />

          {/* AI Banner */}
          {aiLoading && (
            <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-xl px-4 py-3">
              <Sparkles
                size={16}
                className="text-orange-500 animate-pulse shrink-0"
              />
              <p className="text-sm text-orange-600 dark:text-orange-400">
                AI is analyzing your photo and generating details...
              </p>
            </div>
          )}

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Item Details */}
          <ItemDetails form={form} onChange={updateForm} />

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Size */}
          <SizeSelector
            value={form.size}
            onChange={(v) => updateForm("size", v)}
          />

          <div className="border-t border-gray-100 dark:border-gray-800" />

          {/* Pricing */}
          <PricingSection form={form} onChange={updateForm} />

          {/* Summary Box */}
          {form.startingPrice && form.size && form.duration && (
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 space-y-2.5">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">
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
                  value: `${form.duration >= 24 ? `${form.duration / 24} day(s)` : `${form.duration} hour(s)`}`,
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200"
          >
            List Item for Auction
          </button>
        </form>
      </div>
    </div>
  );
}
