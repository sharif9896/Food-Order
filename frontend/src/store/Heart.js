import { createSlice } from "@reduxjs/toolkit";

const Heart = createSlice({
  name: "Heart",
  initialState: [],
  reducers: {
    setheart: (state, action) => {
      state.push(action.payload);
    },
    removeheart: (state, action) => {
      return state.filter((itemid) => itemid !== action.payload);
    },
  },
});
export const heartAction = Heart.actions;
export default Heart;
