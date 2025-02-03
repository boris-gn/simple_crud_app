import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Comment } from "@/types";

interface CommentsState {
  comments: Comment[];
  status: string;
}

const initialState: CommentsState = {
  comments: [],
  status: "idle"
}

export const fetchComments = createAsyncThunk("comments/fetch", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
});

export const addComment = createAsyncThunk(
  "comments/add",
  async (newComment: Omit<Comment, "id">) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment)
    });
    return response.json();
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ id, changes }: { id: number; changes: Partial<Comment> }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes)
    });
    return { id, changes: await response.json() };
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: "DELETE"
    });
    return id;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = { ...state.comments[index], ...action.payload.changes };
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c.id !== action.payload);
      });
  }
});

export default commentsSlice.reducer;
