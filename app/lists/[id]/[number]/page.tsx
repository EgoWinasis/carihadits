// app/lists/[id]/[number]/page.tsx
"use client"; // dibutuhkan untuk router.back()

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Hadith {
  number: number;
  arab: string;
  id: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: {
    name: string;
    id: string;
    available: number;
    contents: Hadith;
  };
  error: boolean;
}

export default function HadithDetail() {
  const params = useParams();
  const router = useRouter();

  const { id, number } = params; // id = darimi, number = 1

  const [hadith, setHadith] = useState<Hadith | null>(null);
  const [bookName, setBookName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHadith() {
      try {
        const res = await fetch(
          `https://api.hadith.gading.dev/books/${id}/${number}`
        );
        const json: ApiResponse = await res.json();
        if (!json.error) {
          setHadith(json.data.contents);
          setBookName(json.data.name);
        } else {
          setError("Hadits tidak ditemukan");
        }
      } catch (err) {
        setError("Gagal mengambil data hadits");
      } finally {
        setLoading(false);
      }
    }

    fetchHadith();
  }, [id, number]);

  if (loading) return <p className="text-center mt-10">Memuat hadits...</p>;
  if (error || !hadith) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        {bookName} – No. {hadith.number}
      </h1>

      {/* Arab */}
      <div className="bg-green-50 p-6 rounded-2xl shadow-inner">
        <p
          className="text-2xl text-right leading-loose"
          style={{ direction: "rtl", unicodeBidi: "bidi-override" }}
        >
          {hadith.arab}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 my-6" />

      {/* Terjemahan */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <p className="text-gray-800 text-lg leading-relaxed text-justify">{hadith.id}</p>
      </div>

      {/* Tombol kembali */}
      <div className="text-center">
        <button
          onClick={() => router.back()}
          className="px-5 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-all duration-200"
        >
          ← Kembali
        </button>
      </div>
    </div>
  );
}