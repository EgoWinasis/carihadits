"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Lists() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const limit = 10;
 // Fungsi untuk bold teks dalam kurung siku []
  const formatBrackets = (text: string) => {
    const regex = /\[([^\]]+)\]/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const index = match.index;
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }
      parts.push(<strong key={index}>{match[1]}</strong>);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);

      const start = (page - 1) * limit + 1;
      const end = page * limit;

      try {
        const res = await fetch(
          `https://api.hadith.gading.dev/books/${id.toLowerCase()}?range=${start}-${end}`
        );

        const json = await res.json();
        setData(json);

        // Scroll ke atas setiap ganti halaman
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page]);

  if (loading)
    return <div className="text-center py-20">Loading...</div>;

  if (!data?.data?.hadiths)
    return (
      <div className="text-center py-20 text-red-600">
        Gagal mengambil data
      </div>
    );

  const hadiths = data.data.hadiths;
  const bookName = data.data.name;
  const totalAvailable = data.data.available;

  const totalPages = Math.ceil(totalAvailable / limit);

  return (
    <main className="flex-grow px-6 py-12 pb-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-10 text-center">
          Kitab {bookName}
        </h1>

        {/* List Hadith */}
        <div className="space-y-8">
            {hadiths.map((item: any) => (
                <div
                key={item.number}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border"
                >
                {/* Header */}
                <h2 className="font-semibold text-green-700 mb-4">
                    {bookName} No. {item.number}
                </h2>

                {/* Arab (dibatasi) */}
                <p
                className="text-2xl text-right leading-loose mb-4"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    direction: 'rtl',       // penting untuk teks Arab
                    unicodeBidi: 'bidi-override', // memastikan ellipsis muncul
                }}
                >
                {item.arab}
                </p>

                {/* Divider */}
                <div className="h-px bg-gray-200 mb-4" />

                {/* Terjemahan (dibatasi) */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                     {formatBrackets(item.id)}
                </p>

                {/* Button */}
                <div className="flex justify-end">
                    <a
                    href={`/lists/${id}/${item.number}`}
                    className="px-4 py-2 bg-green-600 text-white rounded-full 
                                hover:bg-green-700 transition text-sm cursor-pointer"
                    >
                    Lihat Detail →
                    </a>
                </div>
                </div>
            ))}
        </div>
      </div>

      {/* Sticky Floating Pagination */}
<div className="sticky bottom-4 mt-16 flex justify-center z-10">
  <div className="bg-white border shadow-lg rounded-full 
                  px-4 sm:px-6 py-2 sm:py-3 
                  flex items-center gap-2 sm:gap-4
                  max-w-full overflow-x-auto">

    {/* Prev */}
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="px-3 sm:px-4 py-2 
                 bg-gray-200 rounded-full 
                 hover:bg-gray-300 
                 disabled:opacity-50 
                 transition cursor-pointer
                 text-sm sm:text-base"
    >
      Prev
    </button>

    {/* Page Info */}
    <span className="font-medium whitespace-nowrap text-sm sm:text-base">
      {page} / {totalPages}
    </span>

    {/* Input */}
    <input
      type="number"
      min={1}
      max={totalPages}
      placeholder="Go"
      className="w-14 sm:w-20 
                 px-2 sm:px-3 py-2 
                 border rounded-full text-center 
                 text-sm sm:text-base
                 focus:outline-none 
                 focus:ring-2 focus:ring-green-500"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const value = Number(
            (e.target as HTMLInputElement).value
          );
          if (value >= 1 && value <= totalPages) {
            setPage(value);
          }
        }
      }}
    />

    {/* Next */}
    <button
      onClick={() =>
        setPage((p) => Math.min(p + 1, totalPages))
      }
      disabled={page === totalPages}
      className="px-3 sm:px-4 py-2 
                 bg-green-600 text-white rounded-full 
                 hover:bg-green-700 
                 disabled:opacity-50 
                 transition cursor-pointer
                 text-sm sm:text-base"
    >
      Next
    </button>
  </div>
</div>
    </main>
  );
}