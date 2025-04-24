from fastapi import FastAPI, HTTPException
from typing import List
from .database import SessionLocal, engine, Base
from .schemas import MovieOut
from .services import (load_data_from_db, preprocess_data, train_tfidf, recommend,)

app = FastAPI(title="FAZtream")

# Buat tabel jika belum ada
Base.metadata.create_all(bind=engine)

# Inisialisasi data + model saat startup
@app.on_event("startup")
def startup_event():
    # load & preprocess
    df_loaded = load_data_from_db()
    df_prep = preprocess_data(df_loaded)
    # assign ke module-level globals
    from . import services
    services.df = df_prep
    # train model
    train_tfidf(df_prep)

@app.get("/search", response_model=List[MovieOut])
def search_movies(query: str):
    if not query:
        raise HTTPException(400, "Query wajib diisi")
    results = recommend(query, top_n=10)
    return results.to_dict(orient="records")
