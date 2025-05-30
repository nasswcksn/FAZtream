import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FAZtream - Smart Movie Recommendation Platform",
  description: "Discover your next favorite movie with FAZtream's smart recommendation system.",
  icons: {
    icon: "/movie.png",
    shortcut: "/movie.png",
  },
  openGraph: {
    title: "FAZtream",
    description: "Smart Movie Recommendation Platform",
    siteName: "FAZtream - Smart Movie Recommendation Platform",
    images: [
      {
        url: "/movie.png",
        width: 800,
        height: 600,
        alt: "FAZtream Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
