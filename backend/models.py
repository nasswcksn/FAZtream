from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class Movie(Base):
    __tablename__ = 'movies'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    genre = Column(String)
    overview = Column(String)

# Model genre (duplikat untuk 17 genre, ganti nama class dan __tablename__)
class Action(Base):
    __tablename__ = 'action'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="action_entries")
    
class Adventure(Base):
    __tablename__ = 'adventure'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="adventure_entries")
    
class Animation(Base):
    __tablename__ = 'animation'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="animation_entries")

class Anime(Base):
    __tablename__ = 'anime'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="anime_entries")
    
class Biography(Base):
    __tablename__ = 'biography'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="biography_entries")

class Comedy(Base):
    __tablename__ = 'comedy'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="comedy_entries")
    
class Crime(Base):
    __tablename__ = 'crime'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="crime_entries")
    
class Drama(Base):
    __tablename__ = 'drama'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="drama_entries")
    
class Family(Base):
    __tablename__ = 'family'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="family_entries")

class Fantasy(Base):
    __tablename__ = 'fantasy'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="fantasy_entries")
    
class Horror(Base):
    __tablename__ = 'horror'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="horror_entries")
    
class Mystery(Base):
    __tablename__ = 'mystery'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="mystery_entries")
    
class Romance(Base):
    __tablename__ = 'romance'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="romance_entries")
    
class ScienceFiction(Base):
    __tablename__ = 'science_fiction'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="science_fiction_entries")
    
class Sport(Base):
    __tablename__ = 'sport'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="sport_entries")
    
class Talk(Base):
    __tablename__ = 'talk'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="talk_entries")
    
class Thriller(Base):
    __tablename__ = 'thriller'
    movie_id = Column(Integer, ForeignKey('movies.id'), primary_key=True)
    poster = Column(String)
    rating = Column(Float)
    link = Column(String)
    title = Column(String)
    date = Column(String)
    movie = relationship("Movie", backref="thriller_entries")