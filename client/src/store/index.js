// import { configureStore } from "@reduxjs/toolkit";
// import coursesReducer from "./slices/coursesSlice";

// const store = configureStore({
//   reducer: {
//     courses: coursesReducer,
//   },
// });

// export default store;

//!
import { configureStore } from "@reduxjs/toolkit";
import chaptersReducer from "./slices/chaptersSlice";

const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
  },
});

export default store;
