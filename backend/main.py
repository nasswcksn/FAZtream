from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine, Base
from .genre_endpoints import router as genre_router
from . import services

app = FastAPI(title="FAZtream Backend")

# Tambahkan CORS agar frontend bisa akses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan domain frontend untuk produksi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/movies", response_model=list[schemas.MovieOut])
def get_movies(db: Session = Depends(get_db)):
    return db.query(models.Movie).all()

@app.post("/recommend", response_model=list[schemas.MovieWithGenreOut])
def recommend_movies(query: schemas.RecommendQuery, db: Session = Depends(get_db)):
    recommendations = services.get_recommendations(query.query, db)
    if not recommendations:
        raise HTTPException(status_code=404, detail="No recommendations found.")
    return recommendations

@app.get("/trending")
def get_trending(db: Session = Depends(get_db)):
    # Ambil data dari semua tabel genre, group by tahun rilis, sum rating
    import collections
    year_rating = collections.defaultdict(float)
    year_to_best = {}
    genre_tables = [
        models.Action, models.Adventure, models.Animation, models.Anime, models.Biography, models.Comedy, models.Crime, models.Drama, models.Family, models.Fantasy, models.Horror, models.Mystery, models.Romance, models.ScienceFiction, models.Sport, models.Talk, models.Thriller
    ]
    for genre_model in genre_tables:
        rows = db.query(genre_model).all()
        for row in rows:
            # Ambil tahun dari kolom release date (bukan dari judul)
            year = None
            if hasattr(row, 'date') and row.date:
                if isinstance(row.date, str):
                    year = row.date[:4]
                else:
                    try:
                        year = str(row.date.year)
                    except Exception:
                        continue
            # Validasi tahun: hanya 4 digit angka
            if not (year and year.isdigit() and len(year) == 4):
                continue
            try:
                rating = float(row.rating)
            except Exception:
                continue
            # Simpan film dengan rating tertinggi per tahun (berdasarkan release date)
            if year not in year_to_best or rating > year_to_best[year]['rating']:
                year_to_best[year] = {
                    'title': row.title,
                    'poster': row.poster,
                    'rating': rating
                }
    # Gabungkan ke year_rating, simpan rating tertinggi antar genre
    for year, movie in year_to_best.items():
        if year not in year_rating or movie['rating'] > year_rating[year]:
            year_rating[year] = movie['rating']
    # Hanya ambil tahun yang punya rating > 0 dan ada data filmnya
    filtered_items = [(y, v) for y, v in year_rating.items() if v > 0 and y in year_to_best]
    sorted_items = sorted(filtered_items, key=lambda x: int(x[0]))
    labels = [item[0] for item in sorted_items]
    values = [item[1] for item in sorted_items]
    movies = [year_to_best[item[0]] for item in sorted_items]
    return {"labels": labels, "values": values, "movies": movies}

@app.on_event("startup")
def startup_event():
    services.load_data()
    services.train_model()

app.include_router(genre_router)
