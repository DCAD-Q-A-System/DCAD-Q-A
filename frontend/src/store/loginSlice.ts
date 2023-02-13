import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JWT } from "../utils/interfaces";

// replace any with the actual data
const init: { data: JWT | null } = { data: null };

export const loginSlice = createSlice({
  name: "login",
  initialState: init,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ data: JWT | null }>
    ) => {
      return { ...state, data: action.payload.data };
    },
  },
});

export const { setData } = loginSlice.actions;

export default loginSlice.reducer;
