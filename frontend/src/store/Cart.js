import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    remove: (state, action) => {
      return state.filter((item) => item === action.payload);
    },
  },
});
export const cartAction = Cart.actions;
export default Cart;
