import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UsersState } from "../../types/user";
import { fetchUsersApi } from "../api";

const initialState: UsersState = {
  users: [],
  status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  return await fetchUsersApi();
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default usersSlice.reducer;
