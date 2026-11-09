const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = require("./config/db");

const movieRoutes = require("./routes/movieRoutes");


const authRoutes=require("./routes/auth");


const app = express();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//     console.log("REQUEST:", req.method, req.url);
//     next();
// });


app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);


app.get("/", (req, res) => {
  res.send("Cineflix is Running");
});

































// const PORT = 8080;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const connectDB = require("./config/db");
// connectDB();
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from the environment.");
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();


