from sqlalchemy import (
    Column, Integer, String, Float, DateTime,
    Table, ForeignKey
)
from sqlalchemy.orm import relationship
from .database import Base
import datetime

# Association table many-to-many
movie_genre = Table(
    'movie_genre', Base.metadata,
    Column('movie_id', Integer, ForeignKey('movies.movies.movie_id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('movies.genres.genre_id'), primary_key=True),
    schema='movies'
)


class Movie(Base):
    __tablename__ = 'movies'
    __table_args__ = {'schema': 'movies'}

    movies_id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    url_poster = Column(String)
    rating = Column(Float)
    link_film = Column(String, nullable=False)
    release_date = Column(DateTime)
    overview     = Column(String) 

class Genre(Base):
    __tablename__  = 'genres'
    __table_args__ = {'schema': 'movies'} 
    genre_id = Column(Integer, primary_key=True)
    name     = Column(String, unique=True)