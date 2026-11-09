import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWatchlist, removeFromWatchlist } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const { token } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!token) {
        setMovies([]);
        setLoading(false);
        
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getWatchlist();
        setMovies(data);
      } catch (err) {
        console.error("Failed to fetch My List:", err);
        setError("Unable to load My List. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [token]);

  const handleRemove = async (movieId) => {
    try {
      setRemovingId(movieId);
      setError("");

      await removeFromWatchlist(movieId);

      setMovies((currentMovies) =>
        currentMovies.filter((movie) => movie._id !== movieId)
      );
    } catch (err) {
      console.error("Failed to remove movie:", err);
      setError("Unable to remove this movie. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <div className="my-list-page">
        <h1>My List</h1>
        <p>Loading your movies...</p>
      </div>
    );
  }

  return (
    <div className="my-list-page">
      <h1>My List</h1>

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {movies.length === 0 && !error ? (
        <div className="my-list-empty">
          <h2>Your list is looking a little empty!</h2>
          <p>Add movies you want to watch, and they'll appear here.</p>
          <Link to="/" className="browse-movies-button">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="my-list-card" key={movie._id}>
              <Link
                to={`/movies/${movie._id}`}
                className="movie-card"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.releaseYear}</p>
              </Link>

              <button
                type="button"
                onClick={() => handleRemove(movie._id)}
                disabled={removingId === movie._id}
              >
                {removingId === movie._id ? "Removing..." : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;