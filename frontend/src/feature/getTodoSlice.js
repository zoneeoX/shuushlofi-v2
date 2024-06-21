import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  isLoading: false,
  isError: false,
  user_todo: [],
};

export const fetchUserTodo = createAsyncThunk("todo/fetch", async () => {
  const response = await api.get("/api/todo/");
  return response.data;
});

const getTodoSlice = createSlice({
  name: "user_todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchUserTodo.fulfilled, (state, action) => {
        state.user_todo = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchUserTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default getTodoSlice.reducer;
