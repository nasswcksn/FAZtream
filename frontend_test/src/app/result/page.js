"use client";
import { Anta } from "next/font/google";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const anta = Anta({ subsets: ["latin"], weight: ["400"] });

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}

function ResultContent() {
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
        <Link href="/" className="flex items-center gap-3">
          <img src="/faztream_logo_v6.png" alt="FAZtream Logo" width={80}className="rounded-md shadow" />
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Home</Link>
          <Link href="/result" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Result</Link>
          <Link href="/trending" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Trending</Link>
          <Link href="/faq" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">FAQ</Link>
          <Link href="/about" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">About Us</Link>
        </div>
      </nav>
      <div className="pt-20 min-h-screen bg-transparent flex flex-col items-center">
        <h1 className={`text-white text-4xl font-extrabold mt-8 mb-8 ${anta.className}`}>Result Page</h1>
        {loading && <div className="text-white">Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && !error && (
          <div className="w-full max-w-6xl min-h-[400px] flex flex-col items-center justify-center">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <img src="/glitch-web-background.png" alt="No Result" className="w-80 h-80 object-contain mb-4" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                {results.map((movie, idx) => (
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
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}