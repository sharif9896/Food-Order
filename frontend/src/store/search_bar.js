import { createSlice } from "@reduxjs/toolkit";

const search_bar = createSlice({
    name:"search_bar",
    initialState: {
        Boolean: false,
    },
    reducers:{
        showsearch:(state)=>{
            state.Boolean = true;
        },
        removesearch:(state)=>{
            state.Boolean = false;
        },
    } 
})
export const search_barAction = search_bar.actions;
export default search_bar;