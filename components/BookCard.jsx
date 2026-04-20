import Link from "next/link";
import SubjectTags from "./SubjectTags";

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4 hover:shadow-md transition">
      {/* Book Cover Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Book Details */}
      <div className="flex-1">
        <p className="text-xs text-gray-500 mb-1">{book.srcName}</p>
        <h3 className="font-semibold text-gray-900 text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{book.description}</p>

        <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
          <span>{book.numberOfPages} pages</span>
          <span>|</span>
          <span>Published: {book.datePublished}</span>
          <span>|</span>
          <span>Updated: {book.dateUpdated}</span>
        </div>

        <SubjectTags subjects={book.subjects} />
      </div>

      {/* Action Button */}
      <div className="flex items-center">
        <Link
          href={`/books/${book._id}`}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-800 transition whitespace-nowrap"
        >
          View Resource
        </Link>
      </div>
    </div>
  );
}