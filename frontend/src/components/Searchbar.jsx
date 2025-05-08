import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchAction } from "../store/Search_products";
import { search_barAction } from "../store/search_bar";

const Searchbar = () => {
  const location = useLocation();
  const [visible, setvisible] = useState(false);
  const search = useSelector((store) => store.Search_products);
  const showsearch = useSelector((store) => store.search_bar);
  const dispatch = useDispatch();


  const setsearch = (e) => {
    dispatch(SearchAction.searchitems(e.target.value));
  };

  const removeserc = () => {
    dispatch(search_barAction.removesearch());
  };

  return location.pathname.includes("/Collections") && showsearch.Boolean ? (
    <>
      <br />
      <div className="border-t border-b bg-gray-50 text-center">
        <div className="inline-flex item-center justify-center border border-gray-400  px-5 py-2 my-3 mx-3 rounded-full w-3/4 sm:w-1/2">
          <input
            value={search}
            onChange={(e) => setsearch(e)}
            className="flex-1 outline-none bg-inherit text-sm"
            type="text"
            placeholder=" Search"
          />
          <img className="w-4" src={assets.search_icon} alt="" />
        </div>
        <img
          onClick={() => removeserc()}
          className="inline w-3 cursor-pointer"
          src={assets.cross_icon}
          alt=""
        />
      </div>
    </>
  ) : null;
};
export default Searchbar;
