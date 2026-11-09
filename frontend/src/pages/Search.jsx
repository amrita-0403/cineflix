import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../services/movieService";

function Search() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "Romance",
    "Science Fiction",
    "Thriller",
  ];

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim() && !genre) {
      setMovies([]);
      setSearched(false);
      setError("Enter a movie title or select a genre.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const data = await searchMovies(query.trim(), genre);
      setMovies(data);
    } catch (err) {
      console.error("Search failed:", err);
      setMovies([]);
      setError(
        err.response?.data?.message ||
          "Unable to search movies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setGenre("");
    setMovies([]);
    setSearched(false);
    setError("");
  };

  return (
    <div className="search-page">
      <h1>Search Movies</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search movie titles"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          aria-label="Filter by genre"
        >
          <option value="">All genres</option>
          {genres.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {loading && <p>Searching for movies...</p>}

      {!loading && !error && searched && movies.length === 0 && (
        <p>No movies found. Try another title or genre.</p>
      )}

      {!loading && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <Link
              to={`/movies/${movie._id}`}
              className="movie-card"
              key={movie._id}
            >
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.releaseYear}</p>
              <p>
                {Array.isArray(movie.genre)
                  ? movie.genre.join(", ")
                  : movie.genre}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;