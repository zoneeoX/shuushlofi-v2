import { configureStore } from "@reduxjs/toolkit";
import getSongReducer from "../feature/getSongSlice";
import postSongReducer from "../feature/postSongSlice";
import deleteSongReducer from "../feature/deleteSongSlice";
import postTodoReducer from "../feature/postTodoSlice";
import deleteTodoReducer from "../feature/deleteTodoSlice";
import getTodoReducer from "../feature/getTodoSlice";

export const store = configureStore({
  reducer: {
    get_song: getSongReducer,
    post_song: postSongReducer,
    delete_song: deleteSongReducer,
    post_todo: postTodoReducer,
    get_todo: getTodoReducer,
    delete_todo: deleteTodoReducer,
  },
});
