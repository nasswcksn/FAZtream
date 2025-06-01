"use client";
import { useState } from "react";
import Link from "next/link";
import { Anta } from "next/font/google";

const anta = Anta({ subsets: ["latin"], weight: ["400"] });

const faqData = [
	{
		question: "Apa itu FAZtream?",
		answer:
			"FAZtream merupakan sebuah platform rekomendasi sistem cerdas yang menggunakan teknik semantic search dengan algoritma TF-IDF dan Cosine Similarity, tujuannya untuk membantu user menemukan film sesuai minat atau preferensi secara cepat dan mudah.",
	},
	{
		question: "Bagaimana cara kerja FAZtream?",
		answer:
			"FAZtream bekerja dengan menggunakan metode content-based filtering. Ketika user memasukkan keyword unik atau judul film, sistem akan langsung menganalisis data film yang tersedia dan mencari film lain dengan kemiripan konten, seperti genre, judul, dan deskripsi. Proses pencocokan ini dilakukan secara otomatis di backend menggunakan algoritma pencarian teks, sehingga rekomendasi yang diberikan relevan dengan preferensi atau minat user.",
	},
	{
		question: "Kenapa memakai algoritma demikian?",
		answer:
			"Karena menggunakan TF-IDF terkenal ringan dan mudah diimplementasikan tanpa membutuhkan perangkat keras yang canggih dan untuk produk prototype sudah cukup menangkap relevansi dasar antara query dan teks (overview/judul).",
	},
	{
		question: "Source dataset yang digunakan?",
		answer:
			"Platform FAZtream dibangun dengan menggunakan dataset yang berasal dari situs web non resmi salah satunya seperti 'IDLIX' yang telah diintegrasikan ke database PostgreSQL yang saat ini sedang digunakan.",
	},
	{
		question: "Bagaimana dengan isu hak cipta?",
		answer:
			"Kami menyadari bahwa Undang-Undang No. 28 Tahun 2014 tentang Hak Cipta (Pasal 113) melarang “mendistribusikan atau memfasilitasi penyebaran ciptaan berhak cipta tanpa izin.” Oleh karena itu, meski FAZtream menggunakan tautan film ilegal untuk menampilkan URL ke situs non-legal, namun platform ini hanya bersifat sebagai media pembelajaran bukan untuk diimplementasikan secara nyata.",
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
				<Link href="/" className="flex items-center gap-3">
					<img
						src="/FAZtream_logo_v6.png"
						alt="FAZtream Logo"
						width={80}
						className="rounded-md shadow"
					/>
				</Link>
				<div className="flex gap-6 text-white font-semibold">
					<Link
						href="/"
						className="relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1"
					>
						Home
					</Link>
					<Link
						href="/result"
						className="relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1"
					>
						Result
					</Link>
          <Link 
            href="/trending" 
            className="relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1"
          >
            Trending
          </Link>
					<Link
						href="/faq"
						className="relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1"
					>
						FAQ
					</Link>
          <Link
						href="/about"
						className="relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1"
					>
						About Us
					</Link>
				</div>
			</nav>
			<h1 className={`text-white text-4xl font-extrabold mt-8 mb-8 ${anta.className}`}>
				Frequently Asked Questions
			</h1>
			<div className="w-full max-w-2xl space-y-6">
				{faqData.map((item, idx) => (
					<div key={idx} className="bg-white/90 rounded-xl shadow-lg p-6">
						<button
							className="w-full text-left text-lg font-bold text-indigo-700 flex justify-between items-center focus:outline-none"
							onClick={() => handleToggle(idx)}
						>
							{item.question}
							<span
								className={`ml-2 transition-transform duration-300 ${
									openIdx === idx ? "rotate-90" : "rotate-0"
								}`}
							>
								▶
							</span>
						</button>
						<div
							className={`overflow-hidden transition-all duration-500 ${
								openIdx === idx
									? "max-h-40 opacity-100 mt-4"
									: "max-h-0 opacity-0 mt-0"
							}`}
						>
							<p className="text-gray-800 text-base">{item.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
