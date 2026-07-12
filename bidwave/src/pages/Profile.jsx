import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Camera, User, Phone, Mail, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#1A1A1A]/10 dark:border-[#E0E0E0]/10 bg-[#FAF9F6] dark:bg-[#121212] text-[#1A1A1A] dark:text-[#E0E0E0] placeholder-[#737373] dark:placeholder-[#A0A0A0] focus:outline-none focus:ring-2 focus:ring-[#4B0082]/30 dark:focus:ring-[#9D4EDD]/30 focus:border-[#4B0082] dark:focus:border-[#9D4EDD] transition-all";

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });
      const uploadRes = await api.post("/upload", {
        imageBase64: base64,
        mediaType: file.type || "image/jpeg",
      });
      const updateRes = await api.put("/auth/profile", {
        avatar_url: uploadRes.data.url,
      });
      updateUser(updateRes.data);
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to upload image");
      setAvatarPreview(user?.avatar_url || null);
    }
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put("/auth/profile", form);
      updateUser(res.data);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-md mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-[#737373] dark:text-[#A0A0A0] hover:text-[#4B0082] dark:hover:text-[#9D4EDD] transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to Home
        </Link>

        <div className="mb-8 ml-2">
          <h1 className="font-display text-2xl font-black text-[#1A1A1A] dark:text-[#E0E0E0]">
            My Profile
          </h1>
          <p className="text-sm text-[#737373] dark:text-[#A0A0A0] mt-1">
            Manage your personal information
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-3xl p-8 shadow-[0_4px_24px_rgba(75,0,130,0.06)]">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#D4AF37]/30 dark:ring-[#FFD700]/20"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#4B0082] dark:bg-[#9D4EDD] flex items-center justify-center text-white text-3xl font-black ring-4 ring-[#D4AF37]/30 dark:ring-[#FFD700]/20">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-[#D4AF37] dark:bg-[#FFD700] hover:brightness-110 text-[#1A1A1A] rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-60"
              >
                {uploading ? (
                  <Loader size={14} className="animate-spin" />
                ) : (
                  <Camera size={14} />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <p className="text-xs text-[#737373] dark:text-[#A0A0A0] mt-3">
              Click the camera icon to change photo
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className={`${inputClass} opacity-50 cursor-not-allowed`}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#737373] dark:text-[#A0A0A0] uppercase tracking-widest">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373] dark:text-[#A0A0A0]"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center justify-between bg-[#4B0082]/5 dark:bg-[#9D4EDD]/10 border border-[#4B0082]/10 dark:border-[#9D4EDD]/15 rounded-xl px-4 py-3">
              <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
                Account Type
              </p>
              <span className="text-xs font-bold text-[#4B0082] dark:text-[#9D4EDD] capitalize">
                {user?.role}
              </span>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 mt-2 rounded-xl bg-[#4B0082] dark:bg-[#9D4EDD] hover:brightness-110 disabled:opacity-60 text-white font-semibold text-sm shadow-[0_4px_24px_rgba(75,0,130,0.25)] transition-all duration-200"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
