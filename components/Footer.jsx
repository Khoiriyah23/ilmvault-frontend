export default function Footer() {
  return (
    <footer className="bg-green-900 text-white text-center py-6 mt-12">
      <p className="text-sm">
        © {new Date().getFullYear()} Islamic Pro. All rights reserved.
      </p>
      <div className="flex justify-center gap-6 mt-3">
        <a href="#" className="hover:text-green-300 transition text-sm">Facebook</a>
        <a href="#" className="hover:text-green-300 transition text-sm">Twitter</a>
        <a href="#" className="hover:text-green-300 transition text-sm">Instagram</a>
      </div>
    </footer>
  );
}