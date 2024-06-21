import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  isLoading: false,
  isError: false,
  postedTodo: "",
};

export const postTodo = createAsyncThunk("todo/post", async ({ title }) => {
  api
    .post("/api/todo/", { title })
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
});

const postTodoSlice = createSlice({
  name: "post_todo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postedTodo = action.payload;
      })
      .addCase(postTodo.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default postTodoSlice.reducer;
