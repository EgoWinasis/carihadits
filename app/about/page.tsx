export default function AboutPage() {
  return (
    <main className=" bg-white px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Title Card */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow">
          <h1 className="text-4xl font-bold mb-4">
            Tentang <span className="text-green-600">CariHadist</span>
          </h1>
          <p className="text-gray-700 leading-relaxed">
            CariHadist adalah platform pencarian hadist digital yang
            memudahkan siapa saja dalam menemukan hadist dengan cepat,
            mudah, dan akurat. Dirancang dengan tampilan modern dan
            sederhana agar nyaman digunakan oleh semua kalangan.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Visi
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Menjadi platform pencarian hadist digital yang modern,
              terpercaya, dan mudah diakses oleh seluruh umat Islam.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              Misi
            </h2>
            <ul className="text-gray-700 space-y-2 list-disc list-inside">
              <li>Menyediakan akses hadist yang cepat dan akurat</li>
              <li>Menghadirkan pengalaman pengguna yang nyaman</li>
              <li>Mendukung pembelajaran dan dakwah digital</li>
            </ul>
          </div>

        </div>

        

        {/* Closing Card */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow text-center hover:shadow-md transition">
          <p className="text-gray-600 leading-relaxed">
            Semoga <span className="font-semibold text-green-600">CariHadist </span> 
             dapat menjadi sarana yang bermanfaat dalam memperdalam ilmu
            dan mengamalkan ajaran Rasulullah ﷺ.
          </p>
        </div>

      </div>
    </main>
  );
}