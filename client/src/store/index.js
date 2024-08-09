import { configureStore } from "@reduxjs/toolkit";
import chaptersReducer from "./slices/chaptersSlice";

const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
  },
});

export default store;
