import { useState, useRef } from "react";
import { ImagePlus, X, Sparkles, Loader } from "lucide-react";

export default function ImageUpload({
  onImagesChange,
  onAIGenerate,
  aiLoading,
}) {
  const [images, setImages] = useState([]);
  const inputRef = useRef();

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
    }));
    const updated = [...images, ...newImages].slice(0, 4);
    setImages(updated);
    onImagesChange(updated);
  };

  const removeImage = (id) => {
    const updated = images.filter((img) => img.id !== id);
    setImages(updated);
    onImagesChange(updated);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
          Item Photos{" "}
          <span className="text-[#B22222] dark:text-[#FF6666]">*</span>
        </label>
        {images.length > 0 && (
          <button
            type="button"
            onClick={() => onAIGenerate(images[0])}
            disabled={aiLoading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B0082] dark:text-[#9D4EDD] hover:text-[#D4AF37] dark:hover:text-[#FFD700] bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {aiLoading ? (
              <>
                <Loader size={12} className="animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={12} /> Generate with AI
              </>
            )}
          </button>
        )}
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-[#4B0082]/15 dark:border-[#9D4EDD]/20 rounded-2xl p-8 text-center cursor-pointer hover:border-[#D4AF37]/40 dark:hover:border-[#FFD700]/30 hover:bg-[#D4AF37]/5 dark:hover:bg-[#FFD700]/5 transition-all"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#4B0082]/8 dark:bg-[#9D4EDD]/10 flex items-center justify-center">
            <ImagePlus
              size={20}
              className="text-[#4B0082] dark:text-[#9D4EDD]"
            />
          </div>
          <p className="text-sm font-medium text-[#1A1A1A] dark:text-[#E0E0E0]">
            Drop photos here or{" "}
            <span className="text-[#D4AF37] dark:text-[#FFD700]">browse</span>
          </p>
          <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
            Up to 4 photos · JPG, PNG
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative group rounded-xl overflow-hidden border border-[#4B0082]/10 dark:border-[#9D4EDD]/15"
              style={{ height: "80px" }}
            >
              <img
                src={img.preview}
                alt=""
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] bg-[#1A1A1A]/70 text-white px-1.5 py-0.5 rounded-md">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(img.id);
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-[#B22222] text-white rounded-full items-center justify-center hidden group-hover:flex"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
