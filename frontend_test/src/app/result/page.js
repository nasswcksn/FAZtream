"use client";
import { Anta } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const anta = Anta({ subsets: ["latin"], weight: ["400"] });

export default function ResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setError(null);
    fetch("http://localhost:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    })
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md shadow-md flex items-center justify-between px-8 py-3">
        <Link href="/" className={`text-2xl font-extrabold tracking-widest text-white ${anta.className} underline underline-offset-4 decoration-indigo-500`}>FAZtream</Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Home</Link>
          <Link href="/result" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Result</Link>
          <Link href="/faq" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">FAQ</Link>
          <Link href="/trending" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Trending</Link>
        </div>
      </nav>
      <div className="pt-20 min-h-screen bg-transparent flex flex-col items-center">
        <h1 className={`text-white text-4xl font-extrabold mt-8 mb-8 ${anta.className}`}>Result Page</h1>
        {loading && <div className="text-white">Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && !error && (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.length === 0 ? (
              <div className="text-white col-span-4">Tidak ada hasil</div>
            ) : (
              results.map((movie, idx) => (
                <a
                  key={idx}
                  href={movie.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  <img src={movie.poster || "/movie.png"} alt={movie.title} className="w-24 h-32 object-cover rounded-lg border border-indigo-200 mb-3" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-indigo-700 mb-1">{movie.title} {movie.year ? <span className="text-gray-500 font-normal">({movie.year})</span> : null}</div>
                    <div className="text-sm text-gray-600 mb-1">Genre: {movie.genre || '-'}</div>
                    <div className="text-sm text-gray-600 mb-1">Release: {movie.date || '-'}</div>
                    <div className="text-gray-800 text-xs mb-2 line-clamp-4 min-h-[64px]">{movie.overview || '-'}</div>
                  </div>
                </a>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}