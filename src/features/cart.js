import { createSlice } from "@reduxjs/toolkit";

// redux for cart
const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let oldItem = false;
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id === action.payload) {
          oldItem = true;
          state.cartItems[i].quantity += 1;
        }
      }
      if (!oldItem) {
        const newItem = { id: action.payload, quantity: 1 };
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id === action.payload) {
          state.cartItems.splice(i, 1);
        }
      }
    },
    changeQuantity: (state, action) => {
      const { id, q } = action.payload;
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i].id === id) {
          state.cartItems[i].quantity = q;
        }
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
