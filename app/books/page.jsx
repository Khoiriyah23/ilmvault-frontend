import BookCard from "@/components/BookCard";
import Link from "next/link";

async function getBooks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
      cache: "no-store", // always fetch fresh data
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Islamic Resources</h1>
            <p className="text-gray-500 mt-1">
              Browse and download beneficial Islamic materials
            </p>
          </div>
          <Link
            href="/admin/login"
            className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition text-sm font-medium"
          >
            + Upload Resource
          </Link>
        </div>

        {/* Books List */}
        {books.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-gray-700 font-semibold text-lg">No resources yet</h3>
            <p className="text-gray-400 text-sm mt-2">
              Be the first to upload an Islamic resource!
            </p>
            <Link
              href="/admin/signup"
              className="inline-block mt-6 bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition text-sm"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}