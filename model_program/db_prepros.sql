--Buat tabel film tiap genre
CREATE TABLE action (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE adventure (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE animation (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE anime (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE biography (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE comedy (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE crime (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE drama (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE family (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE fantasy (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

CREATE TABLE horror (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);
CREATE TABLE mystery (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);
CREATE TABLE romance (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);
CREATE TABLE science_fiction (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);
CREATE TABLE sport (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);
CREATE TABLE talk (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);
CREATE TABLE thriller (
    poster TEXT,
    rating REAL,
    link TEXT,
    title TEXT,
    date DATE
);

--Buat Tabel Utama (movies)
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT,
    overview TEXT
);

--Tambahkan Kolom movie_id di Tabel Genre
ALTER TABLE action ADD COLUMN movie_id INTEGER;
ALTER TABLE adventure ADD COLUMN movie_id INTEGER;
ALTER TABLE animation ADD COLUMN movie_id INTEGER;
ALTER TABLE anime ADD COLUMN movie_id INTEGER;
ALTER TABLE biography ADD COLUMN movie_id INTEGER;
ALTER TABLE comedy ADD COLUMN movie_id INTEGER;
ALTER TABLE crime ADD COLUMN movie_id INTEGER;
ALTER TABLE drama ADD COLUMN movie_id INTEGER;
ALTER TABLE family ADD COLUMN movie_id INTEGER;
ALTER TABLE fantasy ADD COLUMN movie_id INTEGER;
ALTER TABLE horror ADD COLUMN movie_id INTEGER;
ALTER TABLE mystery ADD COLUMN movie_id INTEGER;
ALTER TABLE romance ADD COLUMN movie_id INTEGER;
ALTER TABLE science_fiction ADD COLUMN movie_id INTEGER;
ALTER TABLE sport ADD COLUMN movie_id INTEGER;
ALTER TABLE talk ADD COLUMN movie_id INTEGER;
ALTER TABLE thriller ADD COLUMN movie_id INTEGER;


--Isi Kolom movie_id Berdasarkan title ke tabel genre dari tabel movies
UPDATE action a
SET movie_id = m.id
FROM movies m
WHERE a.title = m.title;

UPDATE adventure a
SET movie_id = m.id
FROM movies m
WHERE a.title = m.title;

UPDATE animation a
SET movie_id = m.id
FROM movies m
WHERE a.title = m.title;

UPDATE anime a
SET movie_id = m.id
FROM movies m
WHERE a.title = m.title;

UPDATE biography b
SET movie_id = m.id
FROM movies m
WHERE b.title = m.title;

UPDATE comedy c
SET movie_id = m.id
FROM movies m
WHERE c.title = m.title;

UPDATE crime c
SET movie_id = m.id
FROM movies m
WHERE c.title = m.title;

UPDATE drama d
SET movie_id = m.id
FROM movies m
WHERE d.title = m.title;

UPDATE family f
SET movie_id = m.id
FROM movies m
WHERE f.title = m.title;

UPDATE fantasy f
SET movie_id = m.id
FROM movies m
WHERE f.title = m.title;

UPDATE horror h
SET movie_id = m.id
FROM movies m
WHERE h.title = m.title;

UPDATE mystery m
SET movie_id = m.id
FROM movies m
WHERE m.title = m.title;

UPDATE romance r
SET movie_id = m.id
FROM movies m
WHERE r.title = m.title;

UPDATE science_fiction s
SET movie_id = m.id
FROM movies m
WHERE s.title = m.title;

UPDATE sport s
SET movie_id = m.id
FROM movies m
WHERE s.title = m.title;

UPDATE talk t
SET movie_id = m.id
FROM movies m
WHERE t.title = m.title;

UPDATE thriller t
SET movie_id = m.id
FROM movies m
WHERE t.title = m.title;

-- Cek View gabungan semua data genre yang movie_id masih NULL
CREATE OR REPLACE VIEW v_all_genre_no_movieid AS
SELECT 'action' AS genre, * FROM action WHERE movie_id IS NULL
UNION ALL
SELECT 'adventure' AS genre, * FROM adventure WHERE movie_id IS NULL
UNION ALL
SELECT 'animation' AS genre, * FROM animation WHERE movie_id IS NULL
UNION ALL
SELECT 'anime' AS genre, * FROM anime WHERE movie_id IS NULL
UNION ALL
SELECT 'biography' AS genre, * FROM biography WHERE movie_id IS NULL
UNION ALL
SELECT 'comedy' AS genre, * FROM comedy WHERE movie_id IS NULL
UNION ALL
SELECT 'crime' AS genre, * FROM crime WHERE movie_id IS NULL
UNION ALL
SELECT 'drama' AS genre, * FROM drama WHERE movie_id IS NULL
UNION ALL
SELECT 'family' AS genre, * FROM family WHERE movie_id IS NULL
UNION ALL
SELECT 'fantasy' AS genre, * FROM fantasy WHERE movie_id IS NULL
UNION ALL
SELECT 'horror' AS genre, * FROM horror WHERE movie_id IS NULL
UNION ALL
SELECT 'mystery' AS genre, * FROM mystery WHERE movie_id IS NULL
UNION ALL
SELECT 'romance' AS genre, * FROM romance WHERE movie_id IS NULL
UNION ALL
SELECT 'science_fiction' AS genre, * FROM science_fiction WHERE movie_id IS NULL
UNION ALL
SELECT 'sport' AS genre, * FROM sport WHERE movie_id IS NULL
UNION ALL
SELECT 'talk' AS genre, * FROM talk WHERE movie_id IS NULL
UNION ALL
SELECT 'thriller' AS genre, * FROM thriller WHERE movie_id IS NULL;

--(Opsional) Tambahkan Foreign Key Constraint
ALTER TABLE action
ADD CONSTRAINT fk_action_movie
FOREIGN KEY (movie_id) REFERENCES movies(id);

--Cari judul yang mirip di tabel pusat:
SELECT g.title AS genre_title, m.title AS movies_title
FROM action g
LEFT JOIN movies m ON LOWER(g.title) = LOWER(m.title)
WHERE g.movie_id IS NULL;

--Update movie_id Setelah Perbaikan
UPDATE action a
SET movie_id = m.id
FROM movies m
WHERE LOWER(a.title) = LOWER(m.title) AND a.movie_id IS NULL;