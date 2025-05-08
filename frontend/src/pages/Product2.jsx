import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import Relatedpro from "../components/Relatedpro";
import { cartAction } from "../store/Cart";
import { toast } from "react-toastify";

const Product2 = () => {
  const product = useSelector((state) => state.item2.item[0]);
  const { productId } = useParams();
  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState("");
  const [size, setsize] = useState("");
  const carts = useSelector((store) => store.cart);
  //   const [cart, setCart] = useState({});
  const dispatch = useDispatch();

  const fetchproduct = async () => {
    product.map((data) => {
      if (data._id === productId) {
        setproductdata(data);
        setimage(data.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchproduct();
  }, [productId, product]);

  const addtocart = async (id, size) => {
    let cartdata = structuredClone(carts);
    if (cartdata[id]) {
      if (cartdata[id][size]) {
        cartdata[id][size] += 1;
      } else {
        cartdata[id][size] = 1;
      }
    } else {
      cartdata[id] = {};
      cartdata[id][size] = 1;
    }
    const mr = dispatch(cartAction.setCart(cartdata));
    if (mr) {
      toast.success("Product added to Cart Successfully");
    }
  };
  // else {
  //   cartdata[id] = {};
  //   cartdata[id][size] = 1;
  //   dispatch(cartAction.setCart(cartdata));
  // }
  // console.log(carts);
  useEffect(() => {
    // console.log(carts)
  }, [carts]);

  return productdata ? (
    <>
      <div className="border-t-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100 mx-5">
        {/* prodata */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* proimg */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex flex-row gap-1  sm:flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  sm:justify-normal  sm:w-[18.7%] w-full">
              {productdata.image.map((data, index) => (
                <img
                  src={data}
                  key={index}
                  onClick={() => setimage(data)}
                  className="w-[24%]  border-1 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt="" />
            </div>
          </div>
          {/* produinfo */}
          <div className="flex-1">
            <div className="font-medium text-2xl mt-2">{productdata.name}</div>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className="pl-2">
                ({productdata.rating.stars},{productdata.rating.count})
              </p>
            </div>
            <p className="mt-5 text-3xl font-medium">₹{productdata.price}.00</p>
            <p className="mt-5 text-gray-500 md:w-4/5">
              {productdata.description}
            </p>
            {/* <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productdata.sizes.map((data, index) => (
                  <button
                    onClick={() => setsize(data)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      data === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </div> */}
            <br />
            <button
              onClick={() => addtocart(productdata._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className="border-t-gray-500 mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and Exchange Policy in 7 Days.</p>
            </div>
          </div>
        </div>
        {/* dis view */}
        <div className="mt-20 my-10 sm:mx-10">
          <div className="flex">
            <p className="border py-3 px-5 text-sm">Sescription</p>
            <p className="border py-3 px-5 text-sm">
              Riews ({productdata.rating.stars},{productdata.rating.count})
            </p>
          </div>
          <div className="flex flex-col gap-4 border px-6 text-sm text-gray-500 py-4">
            <p>
              Premium Quality Leather: Made from authentic, high-grade leather
              that offers both style and longevity. Exceptional Craftsmanship:
              Every detail is carefully designed and finished for a flawless
              appearance. Care Instructions: To preserve its beauty and
              durability, avoid exposure to extreme moisture, clean with a soft
              cloth, and use a leather conditioner as needed. Western Leathers –
              Where Style Meets Legacy.
            </p>
            <p>
              Durable & Versatile: Built to withstand daily use while
              maintaining its elegance and functionality. Sophisticated Design:
              A classic yet modern aesthetic that complements every occasion.
              Care Instructions: To preserve its beauty and durability, avoid
              exposure to extreme moisture, clean with a soft cloth, and use a
              leather conditioner as needed. Western Leathers – Where Style
              Meets Legacy.
            </p>
          </div>
        </div>
      </div>
      {/* displarelapro */}
      <Relatedpro
        category={productdata.category}
        subcategory={productdata.subcategory}
      />
    </>
  ) : (
    <div className="opacity-0"></div>
  );
};
export default Product2;
