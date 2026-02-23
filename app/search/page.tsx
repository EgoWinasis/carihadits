import Link from "next/link";
import { getHadithRange } from "@/lib/api";

interface Props {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || "";

  // sementara masih ambil dari Bukhari range 1-100
  const response = await getHadithRange("bukhari", 1, 100);

  const book = response.data;

  const filtered = book.hadiths.filter((item) =>
    item.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-2">
          Hasil Pencarian
        </h1>
        <p className="text-gray-500 mb-8">
          "{query}" ditemukan {filtered.length} hadist di {book.name}
        </p>

        {/* Jika kosong */}
        {filtered.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">
              Tidak ditemukan hasil untuk "{query}"
            </p>
          </div>
        )}

        {/* Results */}
        <div className="space-y-8">
          {filtered.map((item) => (
            <div
              key={item.number}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Header Card */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-green-700">
                  {book.name} No. {item.number}
                </h2>

                {item?.number && (
 <Link
  href={`/book/${book.id}/${item.number}`}
  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700 hover:shadow transition"
>
  Lihat Detail
</Link>
)}
              </div>

              {/* Arab */}
              <p className="text-2xl leading-loose text-right mb-6">
                {item.arab}
              </p>

              {/* Terjemahan */}
              <p className="text-gray-700 leading-relaxed text-justify">
                {item.id}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}