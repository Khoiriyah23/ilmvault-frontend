import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Build The Community <br /> Your Fans Will Love
        </h1>
        <p className="text-lg text-green-100 max-w-xl mx-auto mb-10">
          Islamic Pro is a platform where you can discover, share, and download
          useful Islamic resources — books, PDFs, and more.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/books"
            className="bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-50 transition"
          >
            View Resources
          </Link>
          <Link
            href="/admin/signup"
            className="border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-green-600 transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Browse Resources</h3>
          <p className="text-gray-500 text-sm">
            Explore a growing library of Islamic books and PDFs uploaded by the community.
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">⬆️</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Upload & Share</h3>
          <p className="text-gray-500 text-sm">
            Register as an admin and upload resources for the community to download.
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-4xl mb-4">⬇️</div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Download Freely</h3>
          <p className="text-gray-500 text-sm">
            Download any resource for free and benefit from shared Islamic knowledge.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          Ready to Contribute?
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Join Islamic Pro today and start sharing beneficial knowledge with the Ummah.
        </p>
        <Link
          href="/admin/signup"
          className="bg-green-700 text-white font-semibold px-10 py-3 rounded-full hover:bg-green-800 transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
}