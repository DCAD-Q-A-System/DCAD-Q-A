import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastMessage } from "../utils/interfaces";

const init: ToastMessage = {
  content: "",
  title: "",
  show: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: init,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      return { ...state, show: action.payload.data };
    },
    setContent: (state, action: PayloadAction<string>) => {
      return { ...state, content: action.payload.data };
    },
    setTitle: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload.data };
    },
  },
});

export const { setContent, setTitle, setShow } = toastSlice.actions;

export default toastSlice.reducer;
