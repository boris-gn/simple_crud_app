import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCommentsApi,
  addCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from "./api";

import { CommentType, Comment, CommentPayload, UpdatePayload } from "@/types";

export const fetchComments = createAsyncThunk<CommentType[], void>(
  "comments/fetchComments",
  async () => {
    return await fetchCommentsApi();
  }
);

export const addComment = createAsyncThunk<Comment, CommentPayload>(
  "comments/addComment",
  async (newComment) => {
    return await addCommentApi(newComment);
  }
);

export const updateComment = createAsyncThunk<Comment, UpdatePayload>(
  "comments/updateComment",
  async ({ id, changes }) => {
    return await updateCommentApi(id, changes);
  }
);

export const deleteComment = createAsyncThunk<{ id: number }, number>(
  "comments/deleteComment",
  async (id) => {
    return await deleteCommentApi(id);
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [] as Comment[],
    status: "idle",
    error: null as string | null,
  },
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
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = {
            ...state.comments[index],
            ...action.payload,
          };
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (c) => c.id !== action.payload.id
        );
      });
  },
});

export default commentsSlice.reducer;
