import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_LOGIN_KEY } from "../utils/constants";
import { LoginResponse } from "../utils/interfaces";

const init: { data: LoginResponse | null } = {
  data: localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_LOGIN_KEY) || "")
    : null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: init,
  reducers: {
    setData: (state, action: PayloadAction<{ data: LoginResponse | null }>) => {
      return { ...state, data: action.payload.data };
    },
  },
});

export const { setData } = loginSlice.actions;

export default loginSlice.reducer;
