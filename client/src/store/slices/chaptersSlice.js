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
