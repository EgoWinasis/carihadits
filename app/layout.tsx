import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        {/* PENTING */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}