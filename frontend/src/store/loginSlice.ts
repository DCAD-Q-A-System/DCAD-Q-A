import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// replace any with the actual data
const init: { data: any | null } = { data: null };

export const loginSlice = createSlice({
  name: "login",
  initialState: init,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{ data: GoogleResponse | null }>
    ) => {
      return { ...state, data: action.payload.data };
    },
  },
});

export const { setData } = loginSlice.actions;

export default loginSlice.reducer;
