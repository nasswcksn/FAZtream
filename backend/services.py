import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from difflib import SequenceMatcher
import models
import schemas
import database

# Global variables
# DataFrame, vectorizer, and tfidf_matrix will be loaded and trained once
# Call load_data() and train_model() at app startup

df = None
vectorizer = None
tfidf_matrix = None

GENRE_TABLE_MAP = {
    "action": "action",
    "adventure": "adventure",
    "animation": "animation",
    "anime": "anime",
    "biography": "biography",
    "comedy": "comedy",
    "crime": "crime",
    "drama": "drama",
    "family": "family",
    "fantasy": "fantasy",
    "horror": "horror",
    "mystery": "mystery",
    "romance": "romance",
    "science fiction": "science_fiction",
    "sport": "sport",
    "talk": "talk",
    "thriller": "thriller"
}

def load_data():
    """Load movies data from the database into a pandas DataFrame and preprocess it."""
    global df
    df = pd.read_sql_table("movies", con=database.engine)
    df['genre'] = df['genre'].fillna('')
    df['overview'] = df['overview'].fillna('')
    df['title'] = df['title'].fillna('')
    df['combined_features'] = (df['genre'] + ' ' + df['overview'] + ' ' + df['title']).str.lower()
    return df

def train_model():
    """Train the TF-IDF vectorizer on the combined features column."""
    global vectorizer, tfidf_matrix
    if df is None:
        load_data()
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(df['combined_features'])

def get_autocomplete_suggestions(user_input: str, top_n: int = 5):
    """Return top N movie titles most similar to the input based on combined features."""
    global df, vectorizer, tfidf_matrix
    if df is None or vectorizer is None or tfidf_matrix is None:
        load_data()
        train_model()
    input_vector = vectorizer.transform([user_input.lower()])
    similarities = cosine_similarity(input_vector, tfidf_matrix).flatten()
    
    top_indices = similarities.argsort()[::-1][:top_n]
    top_titles = df.iloc[top_indices]['title'].tolist()
    return top_titles

def find_anchor_movie(title_input, threshold=0.6):
    """Find the most similar title in the dataset. Return title if above threshold, else None."""
    best_match = None
    highest_score = 0
    for title in df['title']:
        score = SequenceMatcher(None, title_input.lower(), title.lower()).ratio()
        if score > highest_score:
            best_match = title
            highest_score = score
    if highest_score >= threshold:
        return best_match
    return None

def recommend_movies_from_anchor(anchor_title, top_n=10):
    """Recommend top N movies based on similarity to the anchor movie title."""
    if vectorizer is None or tfidf_matrix is None:
        train_model()
    try:
        anchor_idx = df[df['title'] == anchor_title].index[0]
    except IndexError:
        return pd.DataFrame()  # No match found
    anchor_vector = tfidf_matrix[anchor_idx]
    similarities = cosine_similarity(anchor_vector, tfidf_matrix)
    scores = list(enumerate(similarities[0]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    movie_indices = [i[0] for i in scores[1:top_n+1]]  # Skip the anchor itself
    return df.iloc[movie_indices]

def get_recommendations(user_query: str, db, top_n: int = 10):
    """Get top N recommended movies based on closest matching title (anchor)."""
    anchor_title = find_anchor_movie(user_query)
    if not anchor_title:
        return []  # Tidak ada judul yang mirip

    top_movies = recommend_movies_from_anchor(anchor_title, top_n=top_n)
    if top_movies.empty:
        return []  # Tidak ada film yang mirip dengan anchor

    movie_titles = top_movies['title'].tolist()
    movies = db.query(models.Movie).filter(models.Movie.title.in_(movie_titles)).all()
    movies_sorted = sorted(movies, key=lambda x: movie_titles.index(x.title))

    genre_models = [
        getattr(models, attr)
        for attr in dir(models)
        if attr[0].isupper() and attr not in ["Base", "Movie"] and hasattr(getattr(models, attr), '__tablename__')
    ]

    results = []
    for movie in movies_sorted:
        genre_data = None
        main_genres = [g.strip().lower() for g in (movie.genre or '').split(',')]
        found = False
        for main_genre in main_genres:
            table_name = GENRE_TABLE_MAP.get(main_genre)
            if not table_name:
                continue
            for genre_model in genre_models:
                if genre_model.__tablename__ == table_name:
                    genre_data = db.query(genre_model).filter(genre_model.movie_id == movie.id).first()
                    if genre_data:
                        found = True
                        break
            if found:
                break
        if not genre_data:
            for genre_model in genre_models:
                genre_data = db.query(genre_model).filter(genre_model.movie_id == movie.id).first()
                if genre_data:
                    break
        results.append({
            'id': movie.id,
            'title': movie.title,
            'genre': movie.genre,
            'overview': movie.overview,
            'poster': genre_data.poster if genre_data else None,
            'link': genre_data.link if genre_data else None,
            'rating': genre_data.rating if genre_data else None,
            'date': str(genre_data.date) if genre_data and genre_data.date is not None else None,
        })
    return results