import { useState, useRef } from "react";
import { Upload, ImagePlus, X, Sparkles, Loader } from "lucide-react";

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
        <label className="text-sm font-semibold text-gray-900 dark:text-white">
          Item Photos
          <span className="text-red-500 ml-0.5">*</span>
        </label>
        {images.length > 0 && (
          <button
            type="button"
            onClick={() => onAIGenerate(images[0])}
            disabled={aiLoading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-500 hover:text-orange-600 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
          >
            {aiLoading ? (
              <>
                <Loader size={12} className="animate-spin" /> Generating...
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
        className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-500/5 transition-all"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <ImagePlus size={20} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Drop photos here or <span className="text-orange-500">browse</span>
          </p>
          <p className="text-xs text-gray-400">Up to 4 photos · JPG, PNG</p>
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
              className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              style={{ height: "800px" }}
            >
              <img
                src={img.preview}
                alt=""
                className="w-full h-full object-cover"
              />
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-md">
                  Main
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(img.id);
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full items-center justify-center hidden group-hover:flex"
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
