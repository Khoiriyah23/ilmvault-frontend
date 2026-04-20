"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-green-700">
        Islamic Pro
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <Link
          href="/books"
          className="text-gray-700 hover:text-green-700 font-medium transition"
        >
          Resources
        </Link>
        <Link
          href="/admin/login"
          className="text-gray-700 hover:text-green-700 font-medium transition"
        >
          Login
        </Link>
        <Link
          href="/admin/signup"
          className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
        >
          Register
        </Link>
      </nav>
    </header>
  );
}