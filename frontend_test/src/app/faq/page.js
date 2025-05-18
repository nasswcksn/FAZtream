"use client";
import { useState } from "react";
import Link from "next/link";

const faqData = [
  {
    question: "Apa itu web platform FAZtream?",
    answer:
      "FAZtream adalah sebuah platform web yang menyediakan layanan rekomendasi film berbasis konten, membantu pengguna menemukan film sesuai minat mereka secara cepat dan mudah.",
  },
  {
    question: "Apa fungsi utama dari FAZtream?",
    answer:
      "Fungsi utama FAZtream adalah memberikan rekomendasi film yang relevan berdasarkan input atau preferensi pengguna, sehingga pengalaman mencari film menjadi lebih efisien dan personal.",
  },
  {
    question: "Dibangun menggunakan teknologi apa saja?",
    answer:
      "FAZtream dibangun menggunakan Next.js (React) untuk frontend, FastAPI untuk backend, PostgreSQL untuk database, serta Tailwind CSS untuk styling dan RapidFuzz untuk pencocokan judul.",
  },
  {
    question: "Bagaimana dengan aspek legalitas dan aturan perfilman?",
    answer:
      "Kami menyadari bahwa industri film memiliki aturan dan regulasi tersendiri. Platform ini dibuat sebagai sarana edukasi dan eksperimen teknologi, bukan untuk tujuan komersial atau distribusi ilegal. Penggunaan data film hanya untuk kebutuhan pembelajaran dan pengembangan teknologi rekomendasi.",
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState(null);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center pt-20">
      <nav className="fixed top-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md shadow-md flex items-center justify-between px-8 py-3">
        <Link href="/" className="text-2xl font-extrabold tracking-widest text-white underline underline-offset-4 decoration-indigo-500">FAZtream</Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Home</Link>
          <Link href="/result" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Result</Link>
          <Link href="/faq" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">FAQ</Link>
          <Link href="/popular" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Popular</Link>
        </div>
      </nav>
      <h1 className="text-white text-4xl font-extrabold mt-8 mb-8 underline underline-offset-8 decoration-indigo-500">FAQ</h1>
      <div className="w-full max-w-2xl space-y-6">
        {faqData.map((item, idx) => (
          <div key={idx} className="bg-white/90 rounded-xl shadow-lg p-6">
            <button
              className="w-full text-left text-lg font-bold text-indigo-700 flex justify-between items-center focus:outline-none"
              onClick={() => handleToggle(idx)}
            >
              {item.question}
              <span className={`ml-2 transition-transform duration-300 ${openIdx === idx ? "rotate-90" : "rotate-0"}`}>▶</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
            >
              <p className="text-gray-800 text-base">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
