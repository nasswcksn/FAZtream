from pydantic import BaseModel
from datetime import date
from typing import List
from typing import Optional

class MovieOut(BaseModel):
    movie_id: int
    title: str
    link_film: str
    rating: Optional[float] = None
    release_date: Optional[date] = None  # jadikan Optional

    class Config:
        from_attributes = True
