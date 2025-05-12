"use client";
import { Kadwa } from "next/font/google";
import Link from "next/link";
import Head from "next/head";

const kadwa = Kadwa({ subsets: ["latin"], weight: ["700"] });

export default function ResultPage() {
  // Dummy data, replace with real data or fetch from API if needed
  const results = [
    { title: "Inception", year: 2010, genre: "Sci-Fi", poster: "/movie.png", desc: "A thief who steals corporate secrets through the use of dream-sharing technology." },
    { title: "Interstellar", year: 2014, genre: "Adventure", poster: "/movie.png", desc: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
    { title: "The Dark Knight", year: 2008, genre: "Action", poster: "/movie.png", desc: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy." },
  ];

  return (
    <>
      <Head>
        <title>Result | FAZtream</title>
      </Head>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md shadow-md flex items-center justify-between px-8 py-3">
        <Link href="/" className={`text-2xl font-extrabold tracking-widest text-white ${kadwa.className} underline underline-offset-4 decoration-indigo-500`}>FAZtream</Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold hover:text-indigo-400 transition-colors duration-200">Home</Link>
          <Link href="/result" className="text-white font-semibold hover:text-indigo-400 transition-colors duration-200">Result</Link>
        </div>
      </nav>
      <div className="pt-20 min-h-screen bg-gradient-to-r from-[#0B0B0B] via-[#181A1B] to-[#6B21A8] flex flex-col items-center">
        <h1 className={`text-white text-4xl font-extrabold mt-8 mb-8 ${kadwa.className} underline underline-offset-8 decoration-indigo-500`}>Result Page</h1>
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((movie, idx) => (
            <div key={idx} className="bg-white/90 rounded-xl shadow-lg p-6 flex gap-4 items-center hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <img src={movie.poster} alt={movie.title} className="w-24 h-32 object-cover rounded-lg border border-indigo-200" />
              <div>
                <div className="text-xl font-bold text-indigo-700 mb-1">{movie.title} <span className="text-gray-500 font-normal">({movie.year})</span></div>
                <div className="text-sm text-gray-600 mb-2">Genre: {movie.genre}</div>
                <div className="text-gray-800 text-sm mb-2">{movie.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
