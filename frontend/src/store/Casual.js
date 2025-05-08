import { createSlice } from "@reduxjs/toolkit";
import { casual } from "../assets/assets";

const casual_categorys = createSlice({
  name: "casual_categorys",
  initialState: [casual],
  reducers: {
    setItems: (state, action) => {
      //  return action.payload
    },
  },
});

export const casualAction = casual_categorys.actions;
export default casual_categorys;
