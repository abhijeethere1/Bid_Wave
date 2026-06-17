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

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
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

      // Save to backend immediately
      const updateRes = await api.put("/auth/profile", {
        avatar_url: uploadRes.data.url,
      });

      updateUser(updateRes.data);
      toast.success("Profile picture updated!");
    } catch (err) {
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
    } catch (err) {
      toast.error("Failed to update profile");
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-md mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={15} /> Back to Home
        </Link>

        <div className="mb-8 ml-2">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your personal information
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-orange-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={user?.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-100 dark:border-gray-800"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-orange-100 dark:border-gray-800">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <button
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-60"
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
            <p className="text-xs text-gray-400 mt-3">
              Click the camera icon to change photo
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Email — read only */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Role badge */}
            <div className="flex items-center justify-between bg-orange-50 dark:bg-orange-500/10 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Account Type
              </p>
              <span className="text-xs font-bold text-orange-500 capitalize">
                {user?.role}
              </span>
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 mt-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 transition-all duration-200"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
