// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import instance from "../../config/axiosInstance";

// export const fetchMyCourses = createAsyncThunk(
//   "courses/fetchMyCourses",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await instance({
//         url: "/my-courses",
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });
//       return data.Courses;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }
//   }
// );

// const coursesSlice = createSlice({
//   name: "courses",
//   initialState: {
//     myCourses: [],
//     myDetailCourse: {},
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     setDetailCourse(state, action) {
//       state.myDetailCourse = action.payload;
//     },
//     removeCourse(state, action) {
//       state.myCourses = state.myCourses.filter(
//         (course) => course.id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMyCourses.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchMyCourses.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.myCourses = action.payload;
//       })
//       .addCase(fetchMyCourses.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { setDetailCourse, removeCourse } = coursesSlice.actions;

// export default coursesSlice.reducer;
//!
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../config/axiosInstance";

export const fetchCourses = createAsyncThunk(
  "chapters/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance({
        url: "/courses",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return data.chapters;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const chaptersSlice = createSlice({
  name: "chapters",
  initialState: {
    chapters: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.chapters = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default chaptersSlice.reducer;
