import { useEffect, useState } from "react";
import { getMovies } from "../services/movieService";

function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            setMovies(data);
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Cineflix Clone</h1>

            {movies.map((movie) => (
                <div key={movie._id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.releaseYear}</p>
                </div>
            ))}
        </div>
    );
}

export default App;