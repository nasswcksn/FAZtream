"use client";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Anta } from "next/font/google";

const anta = Anta({ subsets: ["latin"], weight: ["400"] });

const team = [
  {
    name: 'FAISAL IZZUDDIN',
    nrp: 'NRP 3323600017',
    image: '/images/faishal.jpg',
    role: 'Machine Learning Engineer',
    funFact: 'Always finds a way to relate movies to machine learning!'
  },
  {
    name: 'ANAS WICAKSONO',
    nrp: 'NRP 3323600029',
    image: '/images/anas.jpg',
    role: 'Frontend & Backend Developer',
    funFact: 'Can code a landing page faster than you can pick a movie.'
  },
  {
    name: 'ZAKI ZAIN',
    nrp: 'NRP 3323600006',
    image: '/images/zaki.jpg',
    role: 'Data Engineer',
    funFact: 'Believes every dataset tells a story.'
  },
];

export default function AboutPage() {
  const [flippedCards, setFlippedCards] = useState([false, false, false]);

  const handleFlip = (index) => {
    const newFlipped = [...flippedCards];
    newFlipped[index] = !newFlipped[index];
    setFlippedCards(newFlipped);
  };

  return (
    <>
      <Head>
        <title>About Us | FAZtream</title>
        <link rel="icon" href="/movie.png" />
      </Head>

      <nav className="fixed top-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md shadow-md flex items-center justify-between px-8 py-3">
        <Link href="/" className={`text-2xl font-extrabold tracking-widest text-white ${anta.className} underline underline-offset-4 decoration-indigo-500`}>FAZtream</Link>
        <div className="flex gap-6 text-white font-semibold">
          <Link href="/">Home</Link>
          <Link href="/result">Result</Link>
          <Link href="/trending">Trending</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About Us</Link>
        </div>
      </nav>

      <div className="min-h-screen flex flex-col items-center pt-20 text-white">
        <h1 className={`text-5xl font-extrabold mb-12 text-center ${anta.className}`}>
          Meet Our Team
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 px-2 max-w-5xl mx-auto justify-items-center items-start">
          {team.map((member, index) => (
            <div
              key={index}
              className="w-64 h-80 perspective cursor-pointer group"
              onClick={() => handleFlip(index)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flippedCards[index] ? 'rotate-y-180' : ''}`}>
                {/* Front - huruf inisial */}
                <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center text-[10rem] font-extrabold text-white/70 select-none group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-300">
                  {member.name[0].toUpperCase()}
                </div>

                {/* Back - gambar, nama, nrp, role */}
                <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-105 ${flippedCards[index] ? 'shadow-none' : 'shadow-lg'} ${flippedCards[index] && 'group-hover:shadow-none'}`}> 
                  {/* Foto background */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-4 rounded-2xl transition-all duration-300 group-hover:bg-transparent group-hover:opacity-100`}>
                    <div className="mb-2">
                      <div className="text-lg font-bold text-white tracking-wide">{member.name}</div>
                      <div className="text-sm font-semibold text-indigo-300 uppercase">{member.role}</div>
                      <div className="text-xs text-gray-200 mt-1">{member.nrp}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About Project & More About Section (merged) */}
        <section className="max-w-3xl w-full bg-black/60 rounded-2xl shadow-xl p-8 mb-12 flex flex-col items-center border border-indigo-700 mt-12">
          <h1 className={`text-5xl font-extrabold mb-4 text-center text-white ${anta.className}`}>About the Platform</h1>
          <p className="text-lg text-gray-300 text-left mb-4">
            <span className={`font-bold ${anta.className}`}>FAZtream</span> is a smart movie recommendation platform designed to help users discover their next favorite film. Leveraging modern web technologies and content-based filtering techniques, our system delivers fast, relevant, and personalized movie suggestions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-200 hover:scale-110 hover:bg-indigo-500 underline">Next.js</a>
            <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-200 hover:scale-110 hover:bg-indigo-500 underline">FastAPI</a>
            <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-200 hover:scale-110 hover:bg-indigo-500 underline">PostgreSQL</a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-200 hover:scale-110 hover:bg-indigo-500 underline">Tailwind CSS</a>
            <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf" target="_blank" rel="noopener noreferrer" className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-200 hover:scale-110 hover:bg-indigo-500 underline">TF-IDF</a>
            <a href="https://en.wikipedia.org/wiki/Cosine_similarity" target="_blank" rel="noopener noreferrer" className="bg-indigo-700/80 text-white px-3 py-1 rounded-full text-xs font-semibold transition-transform duration-200 hover:scale-110 hover:bg-indigo-500 underline">Cosine similarity</a>
          </div>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-indigo-400 mb-1">Contact & Info</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Whatsapp: <a href="https://wa.me/6281359290097" className="text-indigo-300">Leader Team (Faisal Izzuddin)</a></li>
                <li>GitHub: <a href="https://github.com/nasswcksn/FAZtream" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">https://github.com/nasswcksn/FAZtream</a></li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-indigo-400 mb-1">Tech Stack</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Frontend: <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">Next.js</a>, <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">Tailwind CSS</a></li>
                <li>Backend: <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">FastAPI</a></li>
                <li>Database: <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">PostgreSQL</a></li>
                <li>ML: <a href="https://en.wikipedia.org/wiki/Content-based_recommendation" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">Content-based Filtering</a>, <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">TF-IDF</a>, <a href="https://en.wikipedia.org/wiki/Cosine_similarity" target="_blank" rel="noopener noreferrer" className="text-indigo-300 underline">Cosine Similarity</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        /* Tambahan transisi vignette agar smooth */
        .group:hover .bg-black\/60 {
          opacity: 0;
        }
        .bg-black\/60 {
          transition: background 0.3s, opacity 0.3s;
        }
      `}</style>
    </>
  );
}
