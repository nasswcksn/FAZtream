# FAZtream Backend

Backend untuk FAZtream - Smart Movie Recommendation Platform

## Fitur
- REST API untuk rekomendasi film berbasis content-based filtering
- Endpoint genre, trending, dan rekomendasi
- Menggunakan FastAPI, SQLAlchemy, PostgreSQL
- Model machine learning: TF-IDF + Cosine Similarity

## Struktur Folder
- `main.py`         : Entry point FastAPI
- `models.py`       : Model SQLAlchemy
- `schemas.py`      : Skema Pydantic untuk request/response
- `services.py`     : Logika rekomendasi & ML
- `genre_endpoints.py` : Endpoint genre
- `database.py`     : Koneksi database
- `requirements.txt`: Daftar dependensi Python

## Menjalankan Backend (Local/Windows)
1. Pastikan PostgreSQL sudah berjalan di `localhost:5432` dan database `faztream_db` sudah dibuat.
2. Install dependensi:
   ```powershell
   pip install -r requirements.txt
   ```
3. Jalankan server:
   ```powershell
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

## Menjalankan Backend (Docker)
1. Pastikan sudah build image dan jalankan via docker compose:
   ```powershell
   docker compose up --build
   ```
2. Pastikan koneksi database diatur sesuai environment (lihat `backend/database.py`).

## Endpoint Utama
- `POST /recommend`   : Rekomendasi film berdasarkan query
- `GET /movies`       : Daftar semua film
- `GET /trending`     : Data film trending per tahun
- `GET /<genre>`      : Daftar film per genre (action, comedy, dll)

## Konfigurasi Database
- Default: `postgresql://postgres:admin123@localhost:5432/faztream_db`
- Untuk Docker: gunakan `host.docker.internal` atau service name sesuai docker-compose

## Catatan
- Untuk pengembangan, gunakan virtual environment.
- Untuk produksi, pastikan variabel environment dan keamanan database sudah diatur.

---

© 2025 FAZtream Team
