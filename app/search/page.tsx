"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Hadith { number: number; id: string; arab: string; }

async function getHadithRange(book: string, start: number, end: number) {
  const res = await fetch(`https://api.hadith.gading.dev/books/${book}?range=${start}-${end}`);
  if (!res.ok) throw new Error("Gagal fetch hadits");
  return res.json();
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [inputValue, setInputValue] = useState(initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);
  const bookName = "Bukhari";

  const formatBrackets = (text: string) => {
    const regex = /\[([^\]]+)\]/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0, match;
    while ((match = regex.exec(text)) !== null) {
      const index = match.index;
      if (index > lastIndex) parts.push(text.slice(lastIndex, index));
      parts.push(<strong key={index}>{match[1]}</strong>);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts;
  };

  // Fetch ketika searchQuery berubah
  useEffect(() => {
    if (!searchQuery) return;
    const fetchHadith = async () => {
      setLoading(true);
      try {
        const response: any = await getHadithRange("bukhari", 1, 100);
        const hadiths: Hadith[] = response.data?.hadiths ?? [];
        const keywords = searchQuery.toLowerCase().trim().split(" ");
        const filtered = hadiths.filter((item) =>
          keywords.every((k) => item.id.toLowerCase().includes(k))
        );
        setResults(filtered);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHadith();
  }, [searchQuery]);

  // Update inputValue dan searchQuery saat URL berubah (misal dari home)
  useEffect(() => {
    if (initialQuery && initialQuery !== searchQuery) {
      setInputValue(initialQuery);
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    router.push(`/search?q=${encodeURIComponent(inputValue)}`);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cari Hadits</h1>

        <form onSubmit={handleSubmit} className="flex mb-8 gap-2">
          <input
            type="text"
            placeholder="Masukkan kata kunci..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Cari
          </button>
        </form>

        {searchQuery && (
          <p className="text-gray-500 mb-6">
            "{searchQuery}" ditemukan {results.length} hadits di {bookName}
          </p>
        )}

        {loading && <p className="text-center text-gray-500">Mencari hadits...</p>}

        {!loading && searchQuery && results.length === 0 && (
          <div className="bg-gray-50 p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">
              Tidak ditemukan hasil untuk "{searchQuery}"
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-8">
            {results.map((item) => (
              <div
                key={item.number}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border"
              >
                <h2 className="font-semibold text-green-700 mb-4">
                  {bookName} No. {item.number}
                </h2>
                <p
                  className="text-2xl text-right leading-loose mb-4"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    direction: "rtl",
                    unicodeBidi: "bidi-override",
                  }}
                >
                  {item.arab}
                </p>
                <div className="h-px bg-gray-200 mb-4" />
                <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                  {formatBrackets(item.id)}
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/lists/bukhari/${item.number}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition text-sm cursor-pointer"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}