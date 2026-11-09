import { Link } from "react-router-dom";

function MovieRow({ title, movies }) {
  return (
    <section className="movie-row">
      <h2>{title}</h2>

      <div className="movie-row-container">
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie._id}`}
            className="row-card"
            key={movie._id}
          >
            <img
              src={movie.poster}
              alt={movie.title}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MovieRow;