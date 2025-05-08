import { useSelector } from "react-redux";
import Title from "../pages/Title";

const CartTotal = () => {
  const cart = useSelector((store) => store.cart);
  const product = useSelector((store) => store.items);
  const getcarttotalamt = () => {
    let totalamount = 0;
    for (const items in cart) {
      const finalamt = product.find((val) => val._id === items);
      for (const item in cart[items]) {
        try {
          if (cart[items][item] > 0) {
            totalamount += finalamt.price * cart[items][item];
          }
        } catch (e) {}
      }
    }
    return totalamount;
  };
  return (
    <>
      <div className="text-xl my-3">
        <Title text1={"CART"} text2={"TOTALS"}></Title>
      </div>
      <div className="w-89 flex flex-col text-sm shadow">
        <div className="flex justify-between items-center py-4 px-5">
          <p>Subtotal</p>
          <p>₹ {getcarttotalamt()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between items-center py-4 px-5">
          <p>Shipping</p>
          <p>₹ 70</p>
        </div>
        <hr />
        <div className="flex justify-between items-center py-4 px-5">
          <p>Total</p>
          <p>₹ {getcarttotalamt()}.00</p>
        </div>
        <hr />
      </div>
    </>
  );
};
export default CartTotal;
