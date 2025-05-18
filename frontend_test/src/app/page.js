"use client";
import { useState, useEffect } from "react";
import { Kadwa } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

const kadwa = Kadwa({ subsets: ["latin"], weight: ["700"] });

export default function Home() {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const titleText = "FAZTREAM";
  const [titleAnim, setTitleAnim] = useState("........");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Typing animation for title
    let i = 0;
    const animate = () => {
      setTitleAnim(titleText.slice(0, i) + "•".repeat(titleText.length - i));
      if (i < titleText.length) {
        i++;
        setTimeout(animate, 300); // 300ms per character, can be adjusted
      }
    };
    animate();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    router.push(`/result?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/movie.png" />
        <link rel="shortcut icon" href="/movie.png" type="image/x-icon" />
        <title>FAZtream</title>
      </Head>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md shadow-md flex items-center justify-between px-8 py-3">
        <Link href="/" className={`text-2xl font-extrabold tracking-widest text-white ${kadwa.className} underline underline-offset-4 decoration-indigo-500`}>FAZtream</Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold hover:text-indigo-400 transition-colors duration-200">Home</Link>
          <Link href="/result" className="text-white font-semibold hover:text-indigo-400 transition-colors duration-200">Result</Link>
        </div>
      </nav>
      <div className="pt-20 min-h-screen flex bg-gradient-to-r from-[#0B0B0B] via-[#181A1B] to-[#6B21A8]">
        {/* Left Panel */}
        <div
          className={`hidden md:flex w-1/3 flex-col justify-between items-center p-0 bg-black/95 rounded-l-3xl overflow-hidden min-h-screen shadow-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
        >
          <div className="flex-1 w-full h-full relative flex items-end justify-center">
            <img src="/pexels-cottonbro-8263351.jpg" alt="Cinema" className="object-cover w-full h-full min-h-[600px] scale-100 transition-transform duration-700 hover:scale-105" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-8 transition-all duration-700">
              <p className="text-white text-lg font-normal drop-shadow-md">
                <span className="font-bold">Faztream</span> merupakan sebuah platform film non legal yang membantu bagi user yang membutuhkan rekomendasi film
              </p>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className={`flex-1 flex flex-col justify-center items-center px-4 bg-gradient-to-br from-transparent via-[#181A1B]/60 to-[#6B21A8]/80 min-h-screen transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1
            className={`text-white text-6xl font-extrabold mb-10 text-center transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${kadwa.className} underline underline-offset-8 decoration-indigo-500`}
            aria-label="FAZtream"
          >
            {titleAnim}
          </h1>
          <form
            onSubmit={handleSearch}
            className={`bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} hover:shadow-2xl hover:scale-105`}
          >
            <input
              className="w-full border rounded-full px-4 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 hover:ring-2 hover:ring-indigo-300"
              placeholder="What kind movies your looking for??"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="w-full flex mb-4">
              <button
                type="button"
                className="border px-4 py-1 rounded-full mr-auto text-sm bg-yellow-100 text-yellow-800 font-semibold shadow hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 cursor-not-allowed"
                tabIndex={-1}
                disabled
              >
                Related History ⚡
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Search
            </button>
          </form>
          {/* Footer */}
          <div className={`mt-20 text-center text-white font-bold transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-xl mb-2">Developed By</div>
            <div className="space-x-4 text-base font-semibold">
              <span className="hover:text-indigo-300 transition-colors duration-300">• FAISHAL IZZUDIN</span>
              <span className="hover:text-indigo-300 transition-colors duration-300">• ANAS WICAKSONO</span>
              <span className="hover:text-indigo-300 transition-colors duration-300">• ZAKI ZAIN</span>
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-in;
          }
        `}</style>
      </div>
    </>
  );
}