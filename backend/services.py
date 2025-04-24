import pandas as pd
from sqlalchemy.orm import Session
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .database import engine
from .models import Movie

# Module-level globals
df: pd.DataFrame = pd.DataFrame()
vectorizer: TfidfVectorizer
tfidf_matrix = None

def load_data_from_db() -> pd.DataFrame:
    df_local = pd.read_sql_table(
        table_name="idlix",
        schema="movies",
        con=engine,
        columns=["movie_id", "title", "overview", "link_film", "rating", "release_date"]
    )
    df_local["overview"] = df_local["overview"].fillna("No description available.")
    return df_local

def preprocess_data(df: pd.DataFrame) -> pd.DataFrame:
    df["combined"] = df["overview"] + " " + df["title"]
    return df

def train_tfidf(df_prep: pd.DataFrame):
    global vectorizer, tfidf_matrix
    vectorizer = TfidfVectorizer(
        stop_words=None, ngram_range=(1, 2),
        max_df=0.8, min_df=1,
        sublinear_tf=True, smooth_idf=True
    )
    tfidf_matrix = vectorizer.fit_transform(df_prep["combined"])

def recommend(user_query: str, top_n: int = 10) -> pd.DataFrame:
    query_vec = vectorizer.transform([user_query])
    sims = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_idx = sims.argsort()[::-1][:top_n]
    return df.iloc[top_idx][['movie_id', 'title', 'link_film', 'rating']]