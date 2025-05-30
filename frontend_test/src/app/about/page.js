"use client";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const team = [
  {
    name: 'Faishal',
    nrp: 'NRP 3323600017',
    image: '/images/faishal.png',
  },
  {
    name: 'Anas',
    nrp: 'NRP 3323600029',
    image: '/images/anas.png',
  },
  {
    name: 'Zaki',
    nrp: 'NRP 3323600006',
    image: '/images/zaki.png',
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
        <Link href="/" className="text-2xl font-extrabold tracking-widest text-white underline underline-offset-4 decoration-indigo-500">FAZtream</Link>
        <div className="flex gap-6 text-white font-semibold">
          <Link href="/">Home</Link>
          <Link href="/result">Result</Link>
          <Link href="/trending">Trending</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About Us</Link>
        </div>
      </nav>

      <div className="min-h-screen flex flex-col items-center pt-20 text-white">
        <h1 className="text-5xl font-extrabold mb-12 text-center underline underline-offset-8 decoration-indigo-500">
          Meet the Team
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 px-2 max-w-5xl mx-auto justify-items-center items-start">
          {team.map((member, index) => (
            <div
              key={index}
              className="w-64 h-80 perspective cursor-pointer"
              onClick={() => handleFlip(index)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flippedCards[index] ? 'rotate-y-180' : ''}`}>
                
                {/* Front - huruf inisial */}
                <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-2xl shadow-lg flex items-center justify-center text-[20rem] font-extrabold text-white/70 select-none">
                  {member.name[0].toUpperCase()}
                </div>

                {/* Back - gambar, nama, nrp */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-lg">
                  {/* Foto background */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />
                  {/* Nama kanan atas */}
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md z-10">
                    {member.name}
                  </div>
                  {/* NRP kanan bawah */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
                    {member.nrp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Deskripsi tim */}
        <div className="mt-12 text-center text-gray-300">
          <h2 className="text-2xl font-semibold mb-4 text-white underline underline-offset-4 decoration-indigo-500">
            Our Team
          </h2>
          <ul className="space-y-2 text-base md:text-lg text-gray-300 list-none">
            <li>• <span className="font-bold text-white">Faishal IR</span> – Machine Learning Engineer</li>
            <li>• <span className="font-bold text-white">Anas Wicaksono</span> – Frontend & Backend Engineer</li>
            <li>• <span className="font-bold text-white">Zaki Zain</span> – Data Engineer</li>
          </ul>
        </div>
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
      `}</style>
    </>
  );
}
