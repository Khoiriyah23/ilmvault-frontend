import Link from "next/link";
import SubjectTags from "@/components/SubjectTags";

async function getBook(id) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/books/${id}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    return null;
  }
}

export default async function SingleResourcePage({ params }) {
  const { bookId } = await params;
  const book = await getBook(bookId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="text-gray-700 font-semibold text-lg">
            Resource not found
          </h2>
          <Link
            href="/books"
            className="inline-block mt-4 text-green-700 hover:underline text-sm"
          >
            ← Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/books"
          className="text-sm text-gray-500 hover:text-green-700 transition mb-6 inline-block"
        >
          ← Back to Resources
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex gap-6 flex-wrap">

            <div className="w-36 h-36 flex-shrink-0">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover rounded-xl shadow-sm"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {book.title}
              </h1>
              <p className="text-green-700 font-medium text-sm mb-3">
                by {book.srcName}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {book.description}
              </p>
              <SubjectTags subjects={book.subjects} />
            </div>

          </div>

          <hr className="my-6 border-gray-100" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Pages</p>
              <p className="font-semibold text-gray-800">
                {book.numberOfPages || "N/A"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Published</p>
              <p className="font-semibold text-gray-800">
                {book.datePublished}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Last Updated</p>
              <p className="font-semibold text-gray-800">
                {book.dateUpdated}
              </p>
            </div>
          </div>

          {book.file ? (
            <a
              href={"http://localhost:5000/api/books/" + book._id + "/download"}
              className="block w-full text-center bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              ⬇️ Download Resource
            </a>
          ) : (
            <p className="text-center text-gray-400 text-sm">
              No file available for download.
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
