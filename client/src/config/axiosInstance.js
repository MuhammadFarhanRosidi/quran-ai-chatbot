import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://farhanrosidi.online",
  timeout: 10000, // Timeout 10 detik
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
