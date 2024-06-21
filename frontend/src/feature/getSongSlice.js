import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  playlist: [],
  isLoading: false,
  isError: false,
};

export const fetchUserSongs = createAsyncThunk(
  "song/fetchUserSongs",
  async () => {
    const response = await api.get("/api/song/");
    return response.data;
  }
);

const getSongSlice = createSlice({
  name: "user_songs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSongs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserSongs.fulfilled, (state, action) => {
        state.playlist = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUserSongs.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default getSongSlice.reducer;
