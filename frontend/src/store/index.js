import { configureStore } from "@reduxjs/toolkit";
import ItemSlice from "./ItemSlice";
import Blazer_categorys from "./Blazer_categorys";
import Cart from "./Cart";
import Search_products from "./Search_products";
import search_bar from "./search_bar";
import Heart from "./Heart";

const ecommerce = configureStore({
  reducer: {
    items: ItemSlice.reducer,
    Blazer_categorys: Blazer_categorys.reducer,
    cart: Cart.reducer,
    Search_products: Search_products.reducer,
    search_bar: search_bar.reducer,
    Heart: Heart.reducer,
  },
});
export default ecommerce;
