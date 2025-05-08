import { createSlice } from "@reduxjs/toolkit";
import { product2 } from "../assets/assets";
const casualSlice = createSlice({
  name: "items",
  initialState: {
    item: [product2.slice()],
  },
  reducers: {
    setItems: (state, action) => {
      return action.payload;
    },
  },
});

export const casualAction = casualSlice.actions;
export default casualSlice;
