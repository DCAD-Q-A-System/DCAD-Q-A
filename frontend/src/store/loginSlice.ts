import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWT, LoginResponse } from "../utils/interfaces";

// replace any with the actual data
const init: { data: LoginResponse | null } = { data: null };

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
