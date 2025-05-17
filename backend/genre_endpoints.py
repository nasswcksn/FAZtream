from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Contoh endpoint genre: Action
@router.get("/action", response_model=list[schemas.MovieOut])
def get_action_movies(db: Session = Depends(get_db)):
    # Join ke tabel pusat agar bisa akses info lengkap
    results = db.query(models.Movie).join(models.Action, models.Movie.id == models.Action.movie_id).all()
    return results

# Anda bisa menduplikasi endpoint di atas untuk genre lain (adventure, animation, dst)
