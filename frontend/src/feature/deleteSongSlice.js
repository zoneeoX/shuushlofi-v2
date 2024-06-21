import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
};

export const deleteUserSong = createAsyncThunk(
  "delete/song",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/song/delete/${id}/`);
      if (response.status === 204) {
        return id;
      } else {
        return rejectWithValue("Failed to delete song.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteSongSlice = createSlice({
  name: "deleteSong",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserSong.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteUserSong.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Song deleted successfully!";
      })
      .addCase(deleteUserSong.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete song.";
      });
  },
});

export default deleteSongSlice.reducer;
