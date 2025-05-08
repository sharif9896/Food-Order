import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemAction } from "../store/ItemSlice";
import axios from "axios";
import { BACKEND_URL } from "../../utils/utils";

const FetchProducts = () => {
  const dispatch = useDispatch();
  const fetchfood = async (req, res) => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/product/foodlists`);
      const data = response.data.foodlists;
      dispatch(itemAction.setItems(data));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchfood();
  }, []);
  return <></>;
};
export default FetchProducts;
