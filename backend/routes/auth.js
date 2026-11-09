const express = require("express");
const bcrypt = require("bcryptjs");
const User=require("../models/User");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");

const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide your name, email, and password.",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    // Check for an existing account
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate a JWT so the user can log in immediately
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Registration successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Handle duplicate-key errors, including concurrent requests
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      message: "Unable to create your account right now. Please try again.",
    });
  }
});


//login

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//     return res.status(400).json({
//         message: "Invalid email or password"
//     });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         return res.status(400).json({
//             message: "Invalid email or password"
//         });
//     }
    
//     //create token
//     const token = jwt.sign(
//     { userId: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//     );

//     //send it back
//     res.status(200).json({
//     message: "Login successful",
//     token,
//     user: {
//         id: user._id,
//         name: user.name,
//         email: user.email
//     }
//     });
// });


//login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate the input before querying the database
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide your email and password.",
      });
    }

    // Normalize email to match registration behavior
    email = email.trim().toLowerCase();

    // Find the registered user
    const user = await User.findOne({ email });

    // Use the same message for an unknown email or incorrect password
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Compare the entered password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate a JWT after successful authentication
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      message: "Unable to log in right now. Please try again.",
    });
  }
});


router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Profile fetch error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch your profile right now.",
    });
  }
});


router.post("/watchlist/:movieId", protect, async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validate the movie ID before querying MongoDB
    if (!mongoose.isValidObjectId(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Prevent duplicate entries
    const alreadyAdded = user.watchlist.some(
      (id) => id.toString() === movieId
    );

    if (alreadyAdded) {
      return res.status(409).json({
        message: "Movie is already in My List.",
      });
    }

    user.watchlist.push(movie._id);
    await user.save();

    return res.status(200).json({
      message: "Movie added to My List.",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Add to watchlist error:", error.message);

    return res.status(500).json({
      message: "Unable to update My List right now.",
    });
  }
});


router.get("/watchlist", protect, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("watchlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user.watchlist);
  } catch (error) {
    console.error("Get watchlist error:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve My List right now.",
    });
  }
});

router.delete("/watchlist/:movieId", protect, async (req, res) => {
  try {
    const { movieId } = req.params;

    // Validate the movie ID
    if (!mongoose.isValidObjectId(movieId)) {
      return res.status(400).json({
        message: "Invalid movie ID.",
      });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check whether the movie is actually in the watchlist
    const isInWatchlist = user.watchlist.some(
      (id) => id.toString() === movieId
    );

    if (!isInWatchlist) {
      return res.status(404).json({
        message: "Movie not found in My List.",
      });
    }

    // Remove the selected movie
    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();

    return res.status(200).json({
      message: "Movie removed from My List.",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error("Remove from watchlist error:", error.message);

    return res.status(500).json({
      message: "Unable to update My List right now.",
    });
  }
});





     




module.exports = router;