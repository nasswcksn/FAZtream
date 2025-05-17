from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine, Base
from .genre_endpoints import router as genre_router
from . import services

app = FastAPI(title="FAZtream Backend")

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

@app.on_event("startup")
def startup_event():
    services.load_data()
    services.train_model()

app.include_router(genre_router)
