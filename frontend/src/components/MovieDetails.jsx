import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/movieService";

import { useAuth } from "../context/AuthContext";

import { addToWatchlist, getWatchlist,  removeFromWatchlist } from "../services/authService";

function MovieDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [inMyList, setInMyList] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(id);
      setMovie(data);
    };

    fetchMovie();
  }, [id]);


    useEffect(() => {
  const checkWatchlist = async () => {
    //const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const watchlist = await getWatchlist();

      const exists = watchlist.some(
        (savedMovie) => savedMovie._id === id
      );

      setInMyList(exists);
    } catch (error) {
      console.log(error);
    }
  };

  checkWatchlist();
}, [id, token]);


  if (!movie) {
    return <p>Loading...</p>;
  }

  const handleListToggle = async () => {
    if (!token) {
     // alert("Sign In to add movies");
      navigate("/login");
    return;
  }

  try {
    if (inMyList) {
      await removeFromWatchlist(movie._id);
      setInMyList(false);
    } else {
      await addToWatchlist(movie._id);
      setInMyList(true);
    }
  } catch (error) {
    console.log(error);
  }
};



  return (
  <div
    className="movie-details"
    style={{
      backgroundImage: `url(${movie.backdrop})`
    }}
  >
    <div className="movie-details-overlay">
      <div className="movie-details-content">
        <h1>{movie.title}</h1>

        <div className="movie-info">
          <span>{movie.releaseYear}</span>
          <span>⭐ {movie.rating}</span>
          <span>{movie.genre.join(", ")}</span>
        </div>

        <p>{movie.description}</p>

        <div className="hero-buttons">
          <button
            className="play-btn"
            onClick={() => window.open(movie.trailerUrl, "_blank")}
          >
            ▶ Play
          </button>

          <button
            className="list-btn"
            onClick={handleListToggle}
          >
            {inMyList ? "✓ My List" : "＋ My List"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default MovieDetails;