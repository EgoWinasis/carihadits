import Link from "next/link";
import { getBooksList } from "@/lib/api";

export default async function Books() {
  const result = await getBooksList();

  return (
    <main className=" bg-white flex-grow px-6 py-12 ">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Daftar Kitab Hadits
        </h1>

        {/* Book Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.data.map((book: any) => (
            <Link
              href={`/lists/${book.id}`}
              key={book.id}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {book.name}
              </h2>
              <p className="mt-2 text-gray-600">
                Total hadits: {book.available}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}