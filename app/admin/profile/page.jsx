"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookCard from "@/components/BookCard";

export default function ProfilePage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/admin/profile");
        setAdmin(res.data.admin);
        setBooks(res.data.books);
      } catch (err) {
        // Not logged in — redirect to login
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (!confirm) return;

    try {
      await api.post("/admin/logout");
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleDelete = async (bookId) => {
    const confirm = window.confirm("Are you sure you want to delete this resource?");
    if (!confirm) return;

    try {
      await api.delete(`/books/${bookId}`);
      setBooks(books.filter((b) => b._id !== bookId));
    } catch (err) {
      alert("Failed to delete resource.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome Back, {admin?.firstName} {admin?.lastName} 👋
              </h2>
              <p className="text-gray-500 text-sm mt-1">{admin?.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/books/new"
                className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition"
              >
                + Add Resource
              </Link>
              <Link
                href="/books"
                className="border border-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
              >
                View All Resources
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-5 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        {/* My Resources */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            My Resources ({books.length})
          </h3>

          {books.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-gray-700 font-semibold text-lg">
                No resources uploaded yet
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                Start by uploading your first Islamic resource
              </p>
              <Link
                href="/books/new"
                className="inline-block mt-6 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition text-sm"
              >
                Upload Now
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {books.map((book) => (
                <div key={book._id} className="relative">
                  <BookCard book={book} />

                  {/* Edit & Delete Buttons */}
                  <div className="flex gap-2 mt-2 justify-end">
                    <Link
                      href={`/books/${book._id}/edit`}
                      className="text-xs bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-100 transition font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="text-xs bg-red-50 text-red-600 px-4 py-1.5 rounded-lg hover:bg-red-100 transition font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}