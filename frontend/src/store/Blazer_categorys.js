import { createSlice } from "@reduxjs/toolkit";
import { Blazer_category } from "../assets/assets";

const Blazer_categorys = createSlice({
  name: "Blazer_categorys",
  initialState: [Blazer_category],
  reducers: {
    setItems: (state, action) => {
      //  return action.payload
    },
  },
});

export const BlazerAction = Blazer_categorys.actions;
export default Blazer_categorys;