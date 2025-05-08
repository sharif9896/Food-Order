import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Title from "./Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { cartAction } from "../store/Cart";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const product = useSelector((store) => store.items);
  const [cartdata, setcartdata] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const temp = [];
    for (const items in cart) {
      for (const item in cart[items]) {
        if (cart[items][item] > 0) {
          temp.push({
            _id: items,
            size: item,
            quantity: cart[items][item],
          });
        }
      }
    }
    // const size = temp.map((item) => {
    //   if (!item.size) {
    //     toast.error(
    //       "If You have Size in your product please Select the Size otherwise you can delete the product from the cart."
    //     );
    //     return;
    //   }
    // });
    setcartdata(temp);
  }, []);

  const update = async (itemId, size, quanttity) => {
    let cartData = structuredClone(cart);
    cartData[itemId][size] = quanttity;
    dispatch(cartAction.setCart(cartData));
    if (quanttity == 0) {
      toast.error(
        "Your Cart Quantity will going to Empty, Know if you want to proceed these products again you can increment the quantity."
      );
      return;
    }
  };

  return (
    <>
      <div className="border-t pt-14">
        <div className="text-2xl mb-3">
          <Title text1={"YOUR"} text2={"CART"}></Title>
        </div>
        <div>
          {cartdata.map((item, index) => {
            const productData = product.find(
              (product) => product._id === item._id
            );

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image.url}
                    alt=""
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>₹{productData.price}.00</p>
                      <p className="px-2 sm:px-3 sm:py-1 ">{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : update(item._id, item.size, Number(e.target.value))
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => update(item._id, item.size, 0)}
                  className="w-4 m-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full mt-5 text-medium cursor-pointer">
              <Link
                to={"/Place_Orders"}
                // onClick={() => Navigate("/Place_Orders")}
                className="bg-orange-500 text-white text-sm my-8 px-8 py-3 cursor-pointer"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
