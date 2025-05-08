import { createSlice } from "@reduxjs/toolkit";
const ItemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
  },
});

export const itemAction = ItemSlice.actions;
export default ItemSlice;
