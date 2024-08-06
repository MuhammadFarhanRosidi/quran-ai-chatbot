const axios = require("axios");

const instance = axios.create({
  baseURL: "https://quran-api.santrikoding.com/api/surah",
});

module.exports = instance;
