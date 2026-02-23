"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Hadith { number: number; id: string; arab: string; }
interface BookMeta { id: string; name: string; available: number; }

async function fetchBooks() {
  const res = await fetch(`https://api.hadith.gading.dev/books`);
  if (!res.ok) throw new Error("Gagal fetch daftar buku");
  return res.json();
}

async function getHadithRange(book: string, start: number, end: number) {
  const res = await fetch(`https://api.hadith.gading.dev/books/${book}?range=${start}-${end}`);
  if (!res.ok) throw new Error("Gagal fetch hadits");
  return res.json();
}

export default function SearchPage() {
  const router = useRouter();

  const [books, setBooks] = useState<BookMeta[]>([]);
  const [selectedBook, setSelectedBook] = useState("bukhari");

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 300;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res: any = await fetchBooks();
        const data: BookMeta[] = res.data ?? [];
        setBooks(data);
        const defaultBook = data.find(b => b.id === selectedBook);
        if (defaultBook) setTotalPages(Math.ceil(defaultBook.available / limit));
      } catch (e) {
        console.error(e);
      }
    };
    loadBooks();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q") || "";
    const bk = params.get("book") || "";
    if (q) setInputValue(q);
    if (bk) setSelectedBook(bk);
    if (q) setSearchQuery(q);
  }, []);

  const formatBrackets = (text: string) => {
    const regex = /\[([^\]]+)\]/g;
    const parts: (string | React.ReactNode)[] = [];
    let lastIndex = 0, match;
    while ((match = regex.exec(text)) !== null) {
      const idx = match.index;
      if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));
      parts.push(<strong key={idx}>{match[1]}</strong>);
      lastIndex = idx + match[0].length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts;
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchHadith = async () => {
      setLoading(true);
      try {
        const start = (page - 1) * limit + 1;
        const end = page * limit;

        const response: any = await getHadithRange(selectedBook, start, end);
        const hadiths: Hadith[] = response.data?.hadiths ?? [];

        const keys = searchQuery.toLowerCase().trim().split(" ");
        const filtered = hadiths.filter(item =>
          keys.every(k => item.id.toLowerCase().includes(k))
        );

        setResults(filtered);

        const bookMeta = books.find(b => b.id === selectedBook);
        if (bookMeta) setTotalPages(Math.ceil(bookMeta.available / limit));

      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHadith();
  }, [searchQuery, page, selectedBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    setPage(1);
    router.push(`/search?q=${encodeURIComponent(inputValue)}&book=${encodeURIComponent(selectedBook)}`);
  };

  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBook(e.target.value);
    setPage(1);
  };

  const bookMeta = books.find(b => b.id === selectedBook);

  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">Cari Hadits</h1>

        {/* Form Search */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mb-8 gap-2 sm:gap-2 items-stretch">
          <input
            type="text"
            placeholder="Masukkan kata kunci..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <select
            value={selectedBook}
            onChange={handleBookChange}
            className="border rounded-lg px-3 py-2 cursor-pointer sm:w-48"
          >
            {books.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition sm:w-auto w-full"
          >
            Cari
          </button>
        </form>

        {searchQuery && (
          <p className="text-gray-500 mb-4 text-sm sm:text-base">
            “{searchQuery}” ditemukan {results.length} hadits di {bookMeta?.name || selectedBook} dari data {(page-1)*limit+1}–{Math.min(page*limit, bookMeta?.available || page*limit)} ( Total {bookMeta?.available || "?"} hadits )
          </p>
        )}

        {loading && <p className="text-center text-gray-500">Mencari hadits...</p>}

        {!loading && results.length === 0 && searchQuery && (
          <div className="bg-gray-50 p-8 sm:p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm sm:text-lg">
              Tidak ditemukan hasil di halaman {page}.
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6 sm:space-y-8">
            {results.map(item => (
              <div key={item.number} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition border">
                <h2 className="font-semibold text-green-700 mb-2 sm:mb-4 text-sm sm:text-base">
                  {bookMeta?.name} No. {item.number}
                </h2>

                <p
                  className="text-lg sm:text-2xl text-right leading-relaxed mb-2 sm:mb-4"
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

                <div className="h-px bg-gray-200 mb-2 sm:mb-4" />

                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-4 sm:mb-6">
                  {formatBrackets(item.id)}
                </p>

                <div className="flex justify-end">
                  <Link
                    href={`/lists/${selectedBook}/${item.number}`}
                    className="px-3 sm:px-4 py-1 sm:py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition text-xs sm:text-sm"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sticky Floating Pagination */}
        <div className="sticky bottom-4 mt-10 sm:mt-16 flex justify-center z-10">
          <div className="bg-white border shadow-lg rounded-full 
                          px-2 sm:px-4 py-2 sm:py-3 
                          flex items-center gap-1 sm:gap-3
                          max-w-full overflow-x-auto">

            {/* Prev */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-2 sm:px-3 py-1 sm:py-2 
                         bg-gray-200 rounded-full 
                         hover:bg-gray-300 
                         disabled:opacity-50 
                         transition cursor-pointer
                         text-xs sm:text-sm"
            >
              Prev
            </button>

            {/* Page Info */}
            <span className="font-medium whitespace-nowrap text-xs sm:text-sm">
              {page} / {totalPages}
            </span>

            {/* Input */}
            <input
              type="number"
              min={1}
              max={totalPages}
              placeholder="Go"
              className="w-12 sm:w-16 px-1 sm:px-2 py-1 sm:py-2 border rounded-full text-center text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = Number(
                    (e.target as HTMLInputElement).value
                  );
                  if (value >= 1 && value <= totalPages) setPage(value);
                }
              }}
            />

            {/* Next */}
            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={page === totalPages}
              className="px-2 sm:px-3 py-1 sm:py-2 
                         bg-green-600 text-white rounded-full 
                         hover:bg-green-700 
                         disabled:opacity-50 
                         transition cursor-pointer
                         text-xs sm:text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}