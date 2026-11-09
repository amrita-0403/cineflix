import { useEffect, useState } from "react";

import { getMovies } from "./services/movieService";
// import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Profile from "./pages/Profile";


import ProtectedRoute from "./components/ProtectedRoute";
import MyList from "./pages/MyList";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getMovies();
            setMovies(data);
        };

        fetchMovies();
    }, []);

    const topRatedMovies = [...movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    const actionMovies = movies.filter((movie) =>
        movie.genre.includes("Action")
      );

      const comedyMovies = movies.filter((movie) =>
        movie.genre.includes("Comedy")
      );

      const sciFiMovies = movies.filter((movie) =>
        movie.genre.includes("Sci-Fi")
      );

      const dramaMovies = movies.filter((movie) =>
        movie.genre.includes("Drama")
      );


    return (

       <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
        <div>
          <Navbar />
          {movies.length > 0 && <Hero movie={movies[0]} />}
            {/* <h1>Netflix Clone</h1> */}

           {movies.length > 0 && (
      <MovieRow
        title="Popular on Netflix"
        movies={movies}
      />

    )}
    {/* {movies.length > 0 && (
      <MovieRow
        title="Trending Now"
        movies={movies}
      />
    )}

    {movies.length > 0 && (
      <MovieRow
        title="Top Picks for You"
        movies={movies}
      />
    )} */}

      {movies.length > 0 && (
          <MovieRow
            title="English Movies"
            movies={movies.filter(
              (movie) => movie.language === "English"
            )}
          />
        )}

        {movies.length > 0 && (
          <MovieRow
            title="Hindi Movies"
            movies={movies.filter(
              (movie) => movie.language === "Hindi"
            )}
          />
        )}

        <MovieRow
          title="Top Rated Movies"
          movies={topRatedMovies}
        />

        <MovieRow
          title="Action"
          movies={actionMovies}
        />

        <MovieRow
          title="Comedy"
          movies={comedyMovies}
        />

        <MovieRow
          title="Sci-Fi"
          movies={sciFiMovies}
        />

        <MovieRow
          title="Drama"
          movies={dramaMovies}
        />


        </div>
          }
        />

        <Route
          path="/movies/:id"
          element={<MovieDetails />}
        />
        <Route
        path="/register"
        element={<Register />}
       />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/my-list"
          element={
            <ProtectedRoute>
              <MyList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={<Search />}
        />

        <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      </Routes>
      
    </BrowserRouter>
    );
}

export default App;