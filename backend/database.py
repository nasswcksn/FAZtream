import sqlalchemy as sa
from sqlalchemy.orm import declarative_base

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin123@localhost:5432/faztream_db"
engine = sa.create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sa.orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
