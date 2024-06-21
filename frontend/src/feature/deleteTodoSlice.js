import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  isError: false,
  isLoading: false,
  message: "",
};

export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/todo/delete/${id}/`);
      if (response.status === 204) {
        return id;
      } else {
        return rejectWithValue("Failed to delete todo.");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteTodoSlice = createSlice({
  name: "deleteSong",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Song deleted successfully!";
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete song.";
      });
  },
});

export default deleteTodoSlice.reducer;
