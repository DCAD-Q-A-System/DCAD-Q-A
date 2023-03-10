import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import toastReducer from "./toastSlice";
/**
 * global login handler
 * global toast message displayer
 *
 */
export const store = configureStore({
  reducer: { loginReducer, toastReducer },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
