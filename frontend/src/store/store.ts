import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

/**
 * global login handler
 * global snackbar message displayer
 * global error message displayer
 */
export const store = configureStore({
  reducer: { loginReducer },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
