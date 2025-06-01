# FAZtream Frontend

Frontend untuk FAZtream - Smart Movie Recommendation Platform

## Fitur
- UI modern dengan Next.js & Tailwind CSS
- Halaman utama, hasil rekomendasi, trending, FAQ, dan about
- Integrasi dengan backend FastAPI untuk rekomendasi film
- Responsive & mobile friendly

## Struktur Folder
- `src/app/`         : Halaman utama dan sub-halaman (about, faq, result, trending)
- `public/`          : Asset gambar, logo, background
- `globals.css`      : Global styling
- `next.config.mjs`  : Konfigurasi Next.js
- `package.json`     : Dependensi frontend

## Menjalankan Frontend (Local/Windows)
1. Masuk ke folder frontend:
   ```powershell
   cd frontend_test
   ```
2. Install dependensi:
   ```powershell
   npm install
   ```
3. Jalankan development server:
   ```powershell
   npm run dev
   ```
   Akses di http://localhost:3000 (atau port lain jika diubah)

## Menjalankan Frontend (Docker)
1. Build dan jalankan via docker compose:
   ```powershell
   docker compose up --build
   ```
2. Akses di http://localhost:3001

## Konfigurasi API
- Endpoint backend default: `http://localhost:8000`
- Pastikan backend berjalan dan dapat diakses dari frontend

## Catatan
- Logo dan favicon dapat diubah di folder `public/`
- Untuk produksi, pastikan environment variable sudah diatur sesuai kebutuhan

---

© 2025 FAZtream Team
