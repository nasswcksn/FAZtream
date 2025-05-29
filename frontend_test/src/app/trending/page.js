"use client";
import { Anta } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const anta = Anta({ subsets: ["latin"], weight: ["400"] });

export default function TrendingPage() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [moviesPerYear, setMoviesPerYear] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/trending")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then((data) => {
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Kualitas Rating",
              data: data.values,
              borderColor: "#6366f1",
              backgroundColor: "rgba(99,102,241,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        });
        setMoviesPerYear(data.movies || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center pt-20">
      <nav className="fixed top-0 left-0 w-full z-30 bg-black/80 backdrop-blur-md shadow-md flex items-center justify-between px-8 py-3">
        <Link href="/" className={`text-2xl font-extrabold tracking-widest text-white ${anta.className} underline underline-offset-4 decoration-indigo-500`}>FAZtream</Link>
        <div className="flex gap-6">
          <Link href="/" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Home</Link>
          <Link href="/result" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">Result</Link>
          <Link href="/faq" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1">FAQ</Link>
          <Link href="/trending" className="text-white font-semibold relative transition-colors duration-200 hover:text-indigo-400 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full after:absolute after:left-0 after:-bottom-1 underline underline-offset-4 decoration-indigo-500">Trending</Link>
        </div>
      </nav>
      <h1 className={`text-white text-4xl font-extrabold mt-8 mb-8 ${anta.className}`}>Top Movie Ratings Across Decades</h1>
      <div className="w-full max-w-4xl rounded-xl shadow-lg p-8" style={{height: 400, background: '#18181b'}}>
        {loading && <div className="text-gray-300">Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: "top", labels: { color: '#fff' } },
                title: { display: true, text: "Film Trending Berdasarkan Rating", color: '#fff' },
                tooltip: {
                  enabled: true,
                  backgroundColor: '#222',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                  borderColor: '#6366f1',
                  borderWidth: 1,
                  callbacks: {
                    title: (tooltipItems) => {
                      const idx = tooltipItems[0].dataIndex;
                      return moviesPerYear[idx]?.title || '';
                    },
                    label: (tooltipItem) => {
                      const idx = tooltipItem.dataIndex;
                      const movie = moviesPerYear[idx];
                      return [
                        `Rating: ${movie?.rating ?? '-'} `
                      ];
                    },
                    afterBody: (tooltipItems) => {
                      const idx = tooltipItems[0].dataIndex;
                      const movie = moviesPerYear[idx];
                      if (movie?.poster) {
                        return [`img: ${movie.poster}`];
                      }
                      return [];
                    },
                  },
                  external: function(context) {
                    // Custom external tooltip for image
                    const {chart, tooltip} = context;
                    let tooltipEl = chart.canvas.parentNode.querySelector('div.chartjs-tooltip');
                    if (!tooltipEl) {
                      tooltipEl = document.createElement('div');
                      tooltipEl.className = 'chartjs-tooltip';
                      tooltipEl.style.position = 'absolute';
                      tooltipEl.style.pointerEvents = 'none';
                      tooltipEl.style.zIndex = 100;
                      chart.canvas.parentNode.appendChild(tooltipEl);
                    }
                    if (tooltip.opacity === 0) {
                      tooltipEl.style.opacity = 0;
                      return;
                    }
                    const idx = tooltip.dataPoints[0]?.dataIndex;
                    const movie = moviesPerYear[idx];
                    tooltipEl.innerHTML = movie && movie.poster ? `<div style="display:flex;align-items:center;background:#222;padding:8px 12px;border-radius:10px;"><img src='${movie.poster}' style='width:60px;height:80px;object-fit:cover;margin-right:10px;border-radius:8px;border:1px solid #6366f1;'/><div style='color:#fff;'><b>${movie.title}</b><br/>Rating: ${movie.rating}</div></div>` : '';
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.left = chart.canvas.offsetLeft + tooltip.caretX + 'px';
                    tooltipEl.style.top = chart.canvas.offsetTop + tooltip.caretY + 'px';
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Tahun Rilis", color: '#fff' },
                  ticks: { autoSkip: true, maxTicksLimit: 10, color: '#fff' },
                  grid: { color: '#333' },
                },
                y: {
                  title: { display: true, text: "Kualitas Rating", color: '#fff' },
                  beginAtZero: true,
                  ticks: { color: '#fff' },
                  grid: { color: '#333' },
                },
              },
            }}
            style={{ height: 400 }}
          />
        )}
      </div>
    </div>
  );
}
