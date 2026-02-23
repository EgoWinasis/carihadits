"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/search?q=${query}`);
  };

  return (
    <div className=" bg-white flex-grow flex flex-col items-center justify-center bg-white px-4">

      {/* Logo */}
      <h1 className="text-5xl font-bold mb-8">
        <span className="text-green-600">Cari</span>
        <span className="text-gray-900">Hadist</span>
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl"
      >
        <input
          type="text"
          placeholder="Cari hadist... (contoh: shalat, sabar, iman)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-6 py-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Cari Hadits
          </button>
        </div>
      </form>

    </div>
  );
}