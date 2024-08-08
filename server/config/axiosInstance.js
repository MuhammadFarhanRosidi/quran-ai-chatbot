const axios = require("axios");

const instance = axios.create({
  // baseURL: "https://quran-api.santrikoding.com/api/surah",
  baseURL: "https://api.quran.gading.dev/",
});

module.exports = instance;
