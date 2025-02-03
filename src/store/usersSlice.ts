import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

interface UsersState {
  users: User[];
  status: string;
}

const initialState: UsersState = {
  users: [],
  status: "idle"
}

export const fetchUsers = createAsyncThunk("posts/fetch", async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
})


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed"
      })
  }
})

export default usersSlice.reducer
