"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditResourcePage() {
  const router = useRouter();
  const { bookId } = useParams();
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
  const [fetching, setFetching] = useState(true);

  // Load existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${bookId}`);
        const book = res.data.data;
        setForm({
          title: book.title || "",
          srcName: book.srcName || "",
          description: book.description || "",
          datePublished: book.datePublished || "",
          dateUpdated: book.dateUpdated || "",
          numberOfPages: book.numberOfPages || "",
          imageUrl: book.imageUrl || "",
          subjects: book.subjects || "",
        });
      } catch (err) {
        setError("Failed to load resource.");
      } finally {
        setFetching(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      formData.append("title", form.title);
      formData.append("srcName", form.srcName);
      formData.append("description", form.description);
      formData.append("datePublished", form.datePublished);
      formData.append("dateUpdated", form.dateUpdated);
      formData.append("numberOfPages", form.numberOfPages);
      formData.append("imageUrl", form.imageUrl);
      formData.append("subjects", form.subjects);

      await api.put(`/books/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/admin/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading resource...</p>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-900">Edit Resource</h1>
            <p className="text-gray-500 text-sm mt-1">
              Update the details of this resource
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

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Author Name</label>
              <input
                type="text"
                name="srcName"
                value={form.srcName}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date Published</label>
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
                <label className="text-sm font-medium text-gray-700 mb-1 block">Date Updated</label>
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

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Number of Pages</label>
              <input
                type="number"
                name="numberOfPages"
                value={form.numberOfPages}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Subjects / Tags</label>
              <input
                type="text"
                name="subjects"
                value={form.subjects}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Cover Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Replace File (optional)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium"
              />
              {file && (
                <p className="text-xs text-green-600 mt-1">✅ New file: {file.name}</p>
              )}
              {!file && (
                <p className="text-xs text-gray-400 mt-1">
                  Leave empty to keep the existing file
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}