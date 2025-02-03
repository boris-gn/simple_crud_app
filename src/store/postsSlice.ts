import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Post } from "../types"

interface PostsState {
  posts: Post[];
  status: string;
}

const initialState: PostsState = {
  posts: [],
  status: "idle"
}

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
})

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed"
      })
  }
})

export default postsSlice.reducer
