"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateResourcePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    srcName: "",
    description: "",
    datePublished: "",
    dateUpdated: "",
    numberOfPages: "",
    imageUrl: "",
    subjects: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!file) {
      setError("Please select a file to upload.");
      setLoading(false);
      return;
    }

    try {
      // FormData is required for file uploads
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", form.title);
      formData.append("srcName", form.srcName);
      formData.append("description", form.description);
      formData.append("datePublished", form.datePublished);
      formData.append("dateUpdated", form.dateUpdated);
      formData.append("numberOfPages", form.numberOfPages);
      formData.append("imageUrl", form.imageUrl);
      formData.append("subjects", form.subjects);

      await api.post("/books", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/admin/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/profile"
            className="text-gray-500 hover:text-green-700 transition text-sm"
          >
            ← Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Resource</h1>
            <p className="text-gray-500 text-sm mt-1">
              Upload an Islamic book or PDF for the community
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="e.g. Riyadh As-Saliheen"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Author Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="srcName"
                value={form.srcName}
                onChange={handleChange}
                required
                placeholder="e.g. Imam An-Nawawi"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Brief description of the resource..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            {/* Dates Row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Date Published <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="datePublished"
                  value={form.datePublished}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Date Updated <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateUpdated"
                  value={form.dateUpdated}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Number of Pages */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Number of Pages
              </label>
              <input
                type="number"
                name="numberOfPages"
                value={form.numberOfPages}
                onChange={handleChange}
                placeholder="e.g. 250"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Subjects */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Subjects / Tags <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subjects"
                value={form.subjects}
                onChange={handleChange}
                required
                placeholder="e.g. Hadith, Fiqh, Seerah (comma separated)"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cover Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                required
                placeholder="https://example.com/book-cover.jpg"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Upload File (PDF) <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium"
              />
              {file && (
                <p className="text-xs text-green-600 mt-1">
                  ✅ Selected: {file.name}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Uploading..." : "Upload Resource"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}