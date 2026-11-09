import { useState } from "react";
import { addToWatchlist } from "../services/authService";

function Hero({ movie }) {
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");

const handleAddToList = async () => {
  if (!movie?._id || adding) return;

  setAdding(true);
  setMessage("");

  try {
    await addToWatchlist(movie._id);
    setMessage("Added to My List!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  } catch (error) {
    setMessage(
      error.response?.data?.message ||
        "Could not add movie to My List."
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  } finally {
    setAdding(false);
  }
};
const handlePlay = () => {
  if (movie?.trailerUrl) {
    window.open(movie.trailerUrl, "_blank", "noopener,noreferrer");
  } else {
    alert("Trailer not available.");
  }
};

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${movie.backdrop})`,
      }}
    >
      <div className="hero-content">
        <h1>{movie.title}</h1>

        <p>{movie.description}</p>

        <div className="hero-buttons">
          <button className="play-btn" onClick={handlePlay}>
  ▶ Play
</button>

          <button
            className="list-btn"
            onClick={handleAddToList}
            disabled={adding}
          >
            {adding ? "Adding..." : "+ My List"}
          </button>
        </div>

        {message && <p role="status">{message}</p>}
      </div>
    </section>
  );
}

export default Hero;