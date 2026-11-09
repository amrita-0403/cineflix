// const express = require("express");
// const Movie = require("../models/Movie");

// const router = express.Router();

// router.get("/", async (req, res) => {
//     const movies = await Movie.find();

//     res.json(movies);
// });
// // router.get("/search", async (req, res) => {
// //     const { query } = req.query;

// //     const movies = await Movie.find({
// //         title: { $regex: query, $options: "i" }
// //     });

// //     res.json(movies);
// // });

// router.get("/search", async (req, res) => {
//   try {
//     const { query = "", genre = "" } = req.query;

//     const filter = {};

//     if (query.trim()) {
//       const escapedQuery = query.trim().replace(
//         /[.*+?^${}()|[\]\\]/g,
//         "\\$&"
//       );

//       filter.title = {
//         $regex: escapedQuery,
//         $options: "i",
//       };
//     }

//     if (genre.trim()) {
//       filter.genre = genre.trim();
//     }

//     const movies = await Movie.find(filter);

//     res.json(movies);
//   } catch (error) {
//     console.error("Movie search error:", error.message);
//     res.status(500).json({
//       message: "Unable to search movies. Please try again.",
//     });
//   }
// });

// router.get("/:id", async (req, res) => {
//     const movie = await Movie.findById(req.params.id);

//     if (!movie) {
//         return res.status(404).json({
//             message: "Movie not found"
//         });
//     }

//     res.json(movie);
// });

// module.exports=router;

const express = require("express");
const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const router = express.Router();

// GET all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();

    return res.status(200).json(movies);
  } catch (error) {
    console.error("Fetch movies error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve movies. Please try again.",
    });
  }
});

// GET movies by title and/or genre
router.get("/search", async (req, res) => {
  try {
    const { query = "", genre = "" } = req.query;

    // Validate query parameters
    if (typeof query !== "string" || typeof genre !== "string") {
      return res.status(400).json({
        message: "Invalid search parameters.",
      });
    }

    const filter = {};

    // Search by title, ignoring capitalization
    if (query.trim()) {
      const escapedQuery = query.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.title = {
        $regex: escapedQuery,
        $options: "i",
      };
    }

    // Filter by genre
    if (genre.trim()) {
      filter.genre = genre.trim();
    }

    const movies = await Movie.find(filter);

    return res.status(200).json(movies);
  } catch (error) {
    console.error("Movie search error:", error.message);

    return res.status(500).json({
      message: "Unable to search movies. Please try again.",
    });
  }
});

// GET a single movie by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Reject malformed MongoDB IDs
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.error("Fetch movie error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve this movie. Please try again.",
    });
  }
});

module.exports = router;