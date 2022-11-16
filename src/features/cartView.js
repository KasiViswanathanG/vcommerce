import { createSlice } from "@reduxjs/toolkit";

//redux to switch to cart
const initialState = {
  isCartView: false,
};

const cartViewSlice = createSlice({
  name: "cartView",
  initialState,
  reducers: {
    cartView: (state) => {
      state.isCartView = true;
    },
    unCartView: (state) => {
      state.isCartView = false;
    },
  },
});

export default cartViewSlice.reducer;
export const { cartView, unCartView } = cartViewSlice.actions;
