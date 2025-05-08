import { createSlice } from "@reduxjs/toolkit";

const Search_products = createSlice({
    name:"Search_products",
    initialState : "",
    reducers:{
        searchitems : (state,action)=>{
            return action.payload;
        }
    }
})
export const SearchAction = Search_products.actions;
export default Search_products;