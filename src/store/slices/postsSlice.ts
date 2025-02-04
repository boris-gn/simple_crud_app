import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostsState } from "../../types";
import { fetchPostsApi } from "../api";

const initialState: PostsState = {
  posts: [],
  status: "idle",
};

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  return await fetchPostsApi();
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postsSlice.reducer;
