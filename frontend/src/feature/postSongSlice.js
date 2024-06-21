import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../database/api";

const initialState = {
  postedSong: "",
  isLoading: false,
  isError: false,
};

export const postSong = createAsyncThunk("post/song", async (currentInfo) => {
  const { currentName, currentUrl, currentImage } = currentInfo.currentInfo;

  let title = currentName;
  let url = currentUrl;
  let image = currentImage;

  await api
    .post("/api/song/", { title, url, image })
    .then((res) => {
      if (res.status === 201) {
        return res.data;
      } else {
        alert("Gagal");
      }
    })
    .catch((error) => console.log(error));
});

const postSongSlice = createSlice({
  name: "post_song",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postSong.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(postSong.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postedSong = action.payload;
      })
      .addCase(postSong.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default postSongSlice.reducer;
