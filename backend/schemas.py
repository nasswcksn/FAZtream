from pydantic import BaseModel
from typing import Optional

class MovieOut(BaseModel):
    id: int
    title: str
    genre: Optional[str]
    overview: Optional[str]
    class Config:
        orm_mode = True

class MovieWithGenreOut(BaseModel):
    id: int
    title: str
    genre: Optional[str]
    overview: Optional[str]
    poster: Optional[str]
    link: Optional[str]
    rating: Optional[float]
    date: Optional[str]
    class Config:
        orm_mode = True

class RecommendQuery(BaseModel):
    query: str
