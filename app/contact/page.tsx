"use client";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaFacebook,
  FaCoffee
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="flex-grow flex items-center justify-center px-6 py-16 ">

      <div className="w-full max-w-md bg-gray-50 p-10 rounded-2xl shadow-lg text-center space-y-8 border">

        {/* FOTO */}
        <img
          src="https://avatars.githubusercontent.com/u/62259546?v=4"
          alt="Ego Winasis"
          className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-green-600 shadow-md"
        />

        {/* NAMA */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Ego Winasis
          </h1>
          <p className="text-gray-500 text-sm">
            Fullstack Web Developer
          </p>
        </div>

        {/* KONTAK */}
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <FaEnvelope className="text-green-600" />
            <span>egowinasis@gmail.com</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <FaPhone className="text-green-600" />
            <span>+62 896-xxxx-xxxx</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <span>Indonesia</span>
          </div>
        </div>

        {/* CONNECT */}
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-gray-400 mb-4">
            CONNECT WITH ME
          </h2>

          <div className="flex flex-wrap justify-center gap-6 text-xl text-gray-500">
            <a href="https://instagram.com/egowinasis" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition hover:scale-110">
              <FaInstagram />
            </a>

            <a href="https://github.com/egowinasis" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition hover:scale-110">
              <FaGithub />
            </a>

            <a href="https://linkedin.com/in/egowinasis" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition hover:scale-110">
              <FaLinkedin />
            </a>

            <a href="https://tiktok.com/@egowinasis" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition hover:scale-110">
              <FaTiktok />
            </a>

            <a href="https://facebook.com/egowinasis" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition hover:scale-110">
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* SAWERIA */}
        <a
          href="https://saweria.co/egowinasis"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-4 bg-green-600 p-4 rounded-xl text-white font-semibold transition hover:bg-green-700 hover:scale-105"
        >
          <FaCoffee />
          Support Me on Saweria
        </a>

      </div>

    </div>
  );
}