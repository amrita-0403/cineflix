const mongoose = require("mongoose");
require("dotenv").config();

const Movie = require("./models/Movie");

const movies = [
  {
    title: "Inception",
    description:
      "A skilled thief who steals secrets through dream-sharing technology is given a chance to have his past erased.",
    poster:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "English",
    rating: 8.8,
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },

  {
    title: "Interstellar",
    description:
      "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
    releaseYear: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    language: "English",
    rating: 8.7,
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },

  {
    title: "The Dark Knight",
    description:
      "Batman faces a criminal mastermind who plunges Gotham into chaos.",
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3XK.jpg",
    releaseYear: 2008,
    genre: ["Action", "Crime", "Drama"],
    language: "English",
    rating: 9.0,
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },

  {
    title: "Avatar",
    description:
      "A marine is sent to Pandora and becomes caught between two worlds.",
    poster:
      "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/Yc1k4FJ6L3e6x8N6kL0w5e7aZp.jpg",
    releaseYear: 2009,
    genre: ["Action", "Adventure", "Sci-Fi"],
    language: "English",
    rating: 7.9,
    trailerUrl: "https://www.youtube.com/watch?v=5PSNL1qE6VY"
  },

  {
    title: "3 Idiots",
    description:
      "Three engineering students navigate friendship, college life and the pressure to succeed.",
    poster:
      "https://full2faltu.wordpress.com/wp-content/uploads/2009/12/image_thumb1.png?w=463&h=623",
    backdrop:
      "https://www.tallengestore.com/cdn/shop/products/7381746090164A_a4692ab0-dd8a-491d-8c7e-d42c7485b70d.jpg?v=1683929480",
    releaseYear: 2009,
    genre: ["Comedy", "Drama"],
    language: "Hindi",
    rating: 8.4,
    trailerUrl: "https://www.youtube.com/watch?v=K0eDlFX9GMc"
  },

  {
    title: "Dangal",
    description:
      "A former wrestler trains his daughters to become world-class wrestlers despite social challenges.",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoBdjaCjhEkkW1nX_PZONYy_yU6CNqsWCZgtwp34sRkCuJMj-CRZW510fb&s=10",
    backdrop:
      "https://c4.wallpaperflare.com/wallpaper/19/636/868/movies-bollywood-movies-wallpaper-preview.jpg",
    releaseYear: 2016,
    genre: ["Drama", "Sport"],
    language: "Hindi",
    rating: 8.3,
    trailerUrl: "https://www.youtube.com/watch?v=x_7YlGv9u1g"
  },

  {
    title: "Zindagi Na Milegi Dobara",
    description:
      "Three friends embark on a road trip that changes their perspectives on life and friendship.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BOGIzYzg5NzItNDRkYS00NmIzLTk3NzQtZWYwY2VlZDhiYWQ4XkEyXkFqcGc@._V1_.jpg",
    backdrop:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlnW-NP-OSItY6z4c7BbMkQu-OQLx-S-DQxNaTMqLQoVgcR3sS1hwlDb8&s=10",
    releaseYear: 2011,
    genre: ["Comedy", "Drama", "Adventure"],
    language: "Hindi",
    rating: 8.2,
    trailerUrl: "https://www.youtube.com/watch?v=IFJkGZq7Q7U"
  },

  
];

const seedMovies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        await Movie.deleteMany();

        await Movie.insertMany(movies);

        console.log("Movies seeded successfully");

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedMovies();