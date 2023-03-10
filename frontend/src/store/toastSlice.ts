import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const init = {
  content: "",
  title: "",
  variant: "light",
  show: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState: init,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      return { ...state, show: action.payload };
    },
    setVariant: (state, action: PayloadAction<string>) => {
      return { ...state, variant: action.payload };
    },
    setContent: (state, action: PayloadAction<string>) => {
      return { ...state, content: action.payload };
    },
    setTitle: (state, action: PayloadAction<string>) => {
      return { ...state, title: action.payload };
    },
  },
});

export const { setContent, setTitle, setShow, setVariant } = toastSlice.actions;

export default toastSlice.reducer;
