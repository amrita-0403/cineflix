import axios from "axios";
import api from "./api";

// const API_URL = "http://localhost:8080/api/movies";
const API_URL = "/movies";

export const getMovies = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export const getMovieById = async (id) => {
  const response = await api.get(`${API_URL}/${id}`);
  return response.data;
};

export const searchMovies = async (query, genre = "") => {
  const response = await api.get("/movies/search", {
    params: {
      query,
      genre,
    },
  });

  return response.data;
};