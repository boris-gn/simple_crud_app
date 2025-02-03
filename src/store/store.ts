import { configureStore } from "@reduxjs/toolkit"
import commentsReducer from "./commentsSlice"
import postsReducer from "./postsSlice"
import usersReducer from "./usersSlice"

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
