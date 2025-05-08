import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "./Title";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/Cart";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";

const Place_Orders = () => {
  const [visible, setvisible] = useState("cod");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const setIn = () => {
    toast.success("Order Placed Successfully");
    dispatch(cartAction.setCart({}));
    Navigate("/");
  };
  // const {navigate} = useContext(ShopContext)
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-5 sm:pt-14 min-h-[80vh] border-t">
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
          </div>
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder=" First Name"
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder=" Last Name"
            />
          </div>

          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder=" Email Address"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder=" Street"
          />
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder=" City"
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder=" State"
            />
          </div>
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder=" Pin Code"
            />
            <input
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder=" Country"
            />
          </div>
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder=" Phone Number"
          />
        </div>
        {/* right */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"}></Title>
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setvisible("stripe")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    visible === "stripe" ? "bg-green-500" : ""
                  } `}
                ></p>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>
              <div
                onClick={() => setvisible("razorpay")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    visible === "razorpay" ? "bg-green-500" : ""
                  } `}
                ></p>
                <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
              </div>
              <div
                onClick={() => setvisible("cod")}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    visible === "cod" ? "bg-green-500" : ""
                  } `}
                ></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button
                onClick={() => setIn()}
                className="bg-orange-500 text-white px-16 py-3 text-sm cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Place_Orders;
