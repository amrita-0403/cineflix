

// import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth";

// export const registerUser = async (userData) => {
//   const response = await axios.post(
//     `${API_URL}/register`,
//     userData
//   );


//   return response.data;
// };
// export const loginUser = async (userData) => {
//   const response = await axios.post(
//     `${API_URL}/login`,
//     userData
//   );

//   return response.data;
// };

import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data;
};

export const addToWatchlist = async (movieId) => {
  const response = await api.post(`/auth/watchlist/${movieId}`);

  return response.data;
};

export const getWatchlist = async () => {
  const response = await api.get("/auth/watchlist");

  return response.data;
};

export const removeFromWatchlist = async (movieId) => {
  const response = await api.delete(
    `/auth/watchlist/${movieId}`
  );

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};