"use client";
import { useState, useEffect } from "react";
import { Kadwa } from "next/font/google";
import { Anta } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";

const kadwa = Kadwa({ subsets: ["latin"], weight: ["700"] });
const anta = Anta({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mounted, setMounted] = useState(false);
  const titleText = "FAZTREAM";
  const [titleAnim, setTitleAnim] = useState("........");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    let i = 0;
    const animate = () => {
      setTitleAnim(titleText.slice(0, i) + "•".repeat(titleText.length - i));
      if (i < titleText.length) {
        i++;
        setTimeout(animate, 325);
      }
    };
    animate();
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:8000/autocomplete?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    };

    fetchSuggestions();
  }, [query]);

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
        <Link href="/" className="flex items-center gap-3">
          <img src="/faztream_logo_v6.png" alt="FAZtream Logo" width={80} className="rounded-md shadow" />
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold relative hover:text-indigo-400 hover:after:w-full after:transition-all after:absolute after:left-0 after:-bottom-1 after:block after:h-0.5 after:bg-indigo-400 after:w-0">Home</Link>
          <Link href="/result" className="text-white font-semibold relative hover:text-indigo-400 hover:after:w-full after:transition-all after:absolute after:left-0 after:-bottom-1 after:block after:h-0.5 after:bg-indigo-400 after:w-0">Result</Link>
          <Link href="/trending" className="text-white font-semibold relative hover:text-indigo-400 hover:after:w-full after:transition-all after:absolute after:left-0 after:-bottom-1 after:block after:h-0.5 after:bg-indigo-400 after:w-0">Trending</Link>
          <Link href="/faq" className="text-white font-semibold relative hover:text-indigo-400 hover:after:w-full after:transition-all after:absolute after:left-0 after:-bottom-1 after:block after:h-0.5 after:bg-indigo-400 after:w-0">FAQ</Link>
          <Link href="/about" className="text-white font-semibold relative hover:text-indigo-400 hover:after:w-full after:transition-all after:absolute after:left-0 after:-bottom-1 after:block after:h-0.5 after:bg-indigo-400 after:w-0">About Us</Link>
        </div>
      </nav>

      <div className="pt-13 min-h-screen flex bg-transparent">
        {/* Left Panel */}
        <div className={`hidden md:flex w-1/3 flex-col justify-between items-center p-0 bg-black/95 rounded-l-3xl overflow-hidden min-h-screen shadow-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="flex-1 w-full h-full relative flex items-end justify-center">
            <img src="/pexels-cottonbro-8263351.jpg" alt="Cinema" className="object-cover w-full h-full min-h-[600px] scale-100 transition-transform duration-700 hover:scale-105" />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-8 transition-all duration-700">
              <p className="text-white text-lg font-normal drop-shadow-md">
                <span className={`font-bold ${anta.className}`}>FAZtream</span> is a smart movie recommendation platform that helps users who need movie recommendations according to their preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col justify-center items-center px-4 bg-transparent min-h-screen transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className={`text-white text-6xl font-extrabold mb-10 text-center transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${kadwa.className}`} aria-label="FAZtream">
            {titleAnim}
          </h1>

          <form onSubmit={handleSearch} className={`relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} hover:shadow-2xl hover:scale-105`}>
            <input
              className="w-full border rounded-full px-4 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 hover:ring-2 hover:ring-indigo-300"
              placeholder="What kind movies your looking for??"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {/* Suggestion dropdown */}
            {suggestions.length > 0 && (
              <ul className="w-full bg-white border rounded-xl mt-[-12px] mb-4 shadow-md max-h-48 overflow-y-auto absolute top-[100%] z-50">
                {suggestions.map((title, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(title);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-indigo-100 transition-all"
                  >
                    {title}
                  </li>
                ))}
              </ul>
            )}

            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-full font-semibold hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl">
              Search
            </button>
          </form>

          {/* Footer */}
          <footer className="w-full flex flex-col items-center mt-24 mb-6">
            <div className={`text-white text-lg font-semibold mb-2 ${anta.className}`}>Developed By</div>
            <div className={`flex flex-wrap gap-4 text-base font-bold ${anta.className}`}>
              <span className="hover:text-indigo-300 transition-colors duration-300">• FAISHAL IR</span>
              <span className="hover:text-indigo-300 transition-colors duration-300">• ANAS WICAKSONO</span>
              <span className="hover:text-indigo-300 transition-colors duration-300">• ZAKI ZAIN</span>
            </div>
          </footer>
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
