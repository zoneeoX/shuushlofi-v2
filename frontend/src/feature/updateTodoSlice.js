import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  isError: false,
  isLoading: false,
  message: "",
};

export const putTodo = createAsyncThunk(
  "todo/update",
  async ({ currentId, title }) => {
    const response = await api.put(`/api/todo/update/${currentId}/`, { title });
    return response;
  }
);

const updateTodoSlice = createSlice({
  name: "update_todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(putTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(putTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(putTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default updateTodoSlice.reducer;
