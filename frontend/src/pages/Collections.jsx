import Productitem from "../components/Productitem";
import { assets } from "../assets/assets";
import Title from "./Title";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import "./FoodOrder.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/utils";

const Collections = () => {
  const products = useSelector((store) => store.items);
  const search = useSelector((store) => store.Search_products);
  const [showfilter, setshowfilter] = useState(false);
  const [filterpro, setfilterpro] = useState([]);
  const [catagory, setcatagory] = useState([]);
  const [subcatagory, setsubcatagory] = useState([]);
  const [sorts, setsort] = useState("relevant");
  const showsearch = useSelector((store) => store.search_bar);

  // useEffect(() => {
  //   setcatagory(products)
  // },[])
  //   console.log(showsearch);
  const toggleop = (e) => {
    if (catagory.includes(e.target.value)) {
      setcatagory((prev) =>
        prev.filter((item) => {
          item !== e.target.value;
        })
      );
    } else {
      setcatagory((prev) => [...prev, e.target.value]);
    }
  };
  // const togglesub = (e) => {
  //   // console.log(e.target.value);
  //   if (subcatagory.includes(e.target.value)) {
  //     setsubcatagory((prev) =>
  //       prev.filter((item) => {
  //         item !== e.target.value;
  //       })
  //     );
  //   } else {
  //     setsubcatagory((prev) => [...prev, e.target.value]);
  //   }
  // };
  const applyfilter = () => {
    let procopy = products.slice();
    if (showsearch.Boolean && search) {
      procopy = procopy.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (catagory.length > 0) {
      procopy = procopy.filter((data) => catagory.includes(data.category));
    }
    // if (subcatagory.length > 0) {
    //   procopy = procopy.filter((data) =>
    //     subcatagory.includes(data.subcategory)
    //   );
    // }
    setfilterpro(procopy);
  };

  const sortfunc = () => {
    let procopy = products.slice();
    switch (sorts) {
      case "low-high":
        setfilterpro(
          procopy.sort((a, b) => {
            a.price - b.price;
          })
        );
        break;
      case "high-low":
        setfilterpro(
          procopy.sort((a, b) => {
            b.price - a.price;
          })
        );
        break;
      default:
        applyfilter();
        break;
    }
  };

  useEffect(() => {
    sortfunc();
  }, [sorts]);

  useEffect(() => {
    setfilterpro(products);
  }, []);

  useEffect(() => {
    applyfilter();
  }, [catagory, search, showsearch]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    deliveryTime: "",
    paymentMethod: "cash",
  });
  const [errors, setErrors] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  // const token = user.token;
  const product = useSelector((store) => store.items);
  const handleOrderNow = (item) => {
    if (!user) {
      navigate("/Login");
      return;
    }
    setSelectedItem(item);
    setQuantity(1); // Reset quantity when ordering new item
  };

  const handleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Invalid phone number";
    if (!formData.deliveryTime)
      newErrors.deliveryTime = "Please select delivery time";
    if (quantity < 1) newErrors.quantity = "Quantity must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = user.token;
    if (validateForm() && selectedItem) {
      const orderDetails = {
        user: user._id,
        item: selectedItem,
        quantity,
        ...formData,
        total: (selectedItem.price * quantity).toFixed(2),
      };
      const meth = async () => {
        const foodss = await axios.post(
          `${BACKEND_URL}api/user/order`,
          orderDetails
        );
        console.log(foodss.data);
        toast.success(foodss.data.message);
        window.location.href = "/";
      };
      meth();
      dispatch(cartAction.setCart(orderDetails));
      console.log("Order placed:", orderDetails);
      // alert("Order placed successfully!");
      // Reset form
      setSelectedItem(null);
      setFormData({
        name: "",
        address: "",
        phone: "",
        deliveryTime: "",
        paymentMethod: "cash",
      });
    }
  };

  return (
    <>
      <br />
      <div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
          {/* filter */}
          <div className="min-w-60">
            <div className="flex gap-4">
              <p
                onClick={() => setshowfilter(!showfilter)}
                className="text-xl flex items-center cursor-pointer gap-2"
              >
                FILTERS
              </p>
              <span>
                <img
                  className={`h-3 mt-2 sm:hidden ${
                    showfilter ? "rotate-90" : ""
                  }`}
                  src={assets.dropdown_icon}
                />
              </span>
            </div>
            {/* <CATEGO></CATEGO> */}
            <div
              className={`border border-gray-300 pl-5 py-3 mt-6 transition ease-in-out ${
                showfilter ? "" : "hidden"
              } sm:block`}
            >
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 font-light text-gray-700">
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"PIZZA'S"}
                    onChange={toggleop}
                  />
                  Pizza
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Biriyani"}
                    onChange={toggleop}
                  />
                  Biriyani
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Burger"}
                    onChange={toggleop}
                  />
                  Burger
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Sushi"}
                    onChange={toggleop}
                  />
                  Sushi
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Chicken"}
                    onChange={toggleop}
                  />
                  Chicken
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Tikka"}
                    onChange={toggleop}
                  />
                  Tikka
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Fried rice"}
                    onChange={toggleop}
                  />
                  Fried rice
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Veg biriyani"}
                    onChange={toggleop}
                  />
                  Veg biriyani
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Motton Leg"}
                    onChange={toggleop}
                  />
                  Motton Leg
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Motton Brain Fry"}
                    onChange={toggleop}
                  />
                  Motton Brain Fry
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Salad"}
                    onChange={toggleop}
                  />
                  Salad
                </p>
                <p className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-3"
                    value={"Rotti"}
                    onChange={toggleop}
                  />
                  Rotti
                </p>
              </div>
            </div>
            <div
              className={`border border-gray-300 pl-5 py-3 my-5 transition ease-in-out ${
                showfilter ? "" : "hidden"
              } sm:block`}
            >
              {/* <p className="mb-3 text-sm font-medium">TYPE</p>
              <p className="flex gap-2 ">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Topwear"}
                  onChange={togglesub}
                />{" "}
                Topwear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Blazer"}
                  onChange={togglesub}
                />{" "}
                Blazer
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Jacket"}
                  onChange={togglesub}
                />{" "}
                Jacket
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Winterwear"}
                  onChange={togglesub}
                />{" "}
                Winterwear
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Shoes"}
                  onChange={togglesub}
                />{" "}
                Shoes
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Belt"}
                  onChange={togglesub}
                />{" "}
                Belts
              </p> */}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1={"ALL"} text2={"FOODS"} />
              <select
                onChange={(e) => setsort(e.target.value)}
                className="border-2 border-gray-300 text-sm px-2"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12">
              {!selectedItem ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterpro.map((item) => (
                    <div className="">
                      {/* {product.map((item) => ( */}
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white rounded-xl shadow-lg overflow-hidden group"
                      >
                        {/* Image Slider */}
                        <div
                          className="relative h-64 overflow-hidden"
                          //   onMouseEnter={() => handleImageSlide(item._id, 'next')}
                          //   onMouseLeave={() => setImageIndexes(prev => ({...prev, [item._id]: 0}))}
                        >
                          <div
                            className="flex transition-transform duration-500"
                            //   style={{
                            //     transform: `translateX(-${
                            //       (imageIndexes[item._id] || 0) * 100
                            //     }%)`,
                            //   }}
                          >
                            <img
                              key={item._id}
                              src={item.image.url}
                              alt={item.title}
                              onClick={() => handleOrderNow(item)}
                              className="hover:scale-110 transition ease-in-out duration-300 cursor-pointer w-full h-64 object-cover"
                            />
                          </div>

                          {/* Tags */}
                          <div className="absolute top-2 left-2 flex gap-2">
                            {/* {item.tags.map(tag => ( */}
                            <span
                              key={item._id}
                              className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm"
                            >
                              {item.tags}
                            </span>
                            {/* ))} */}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">
                                {item.title}
                              </h3>
                              <p className="text-gray-600">
                                {item.description}
                              </p>
                            </div>
                            <button
                              onClick={() => handleLike(item._id)}
                              className="text-2xl hover:text-orange-500 transition-colors"
                            >
                              {likedItems.includes(item._id) ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart />
                              )}
                            </button>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-orange-600">
                              ₹{item.price.toFixed(2)}
                            </span>
                            <button
                              // onClick={() => addtocart(item._id, item.title)}
                              onClick={() => handleOrderNow(item)}
                              className="bg-orange-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              Order Now
                            </button>
                          </div>
                        </div>

                        {/* Navigation Arrows */}
                        <div className="absolute top-1/2 w-full hidden group-hover:flex justify-between px-4">
                          {/* <button
                className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                onClick={() => handleImageSlide(item.id, 'prev')}
              >
                ←
              </button>
              <button
                className="bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
                onClick={() => handleImageSlide(item.id, 'next')}
              >
                →
              </button> */}
                        </div>
                      </motion.div>
                      {/* //   ))} */}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="product-page">
                  <button
                    className="back-button"
                    onClick={() => setSelectedItem(null)}
                  >
                    ← Back to Menu
                  </button>

                  <div className="product-details">
                    <img
                      src={selectedItem.image.url}
                      alt={selectedItem.title}
                    />
                    <div className="product-info">
                      <h2>{selectedItem.title}</h2>
                      <p>{selectedItem.description}</p>
                      <p className="price">₹{selectedItem.price}/-</p>

                      <div className="quantity-selector">
                        <label>Quantity:</label>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) =>
                            setQuantity(Math.max(1, e.target.value))
                          }
                          className={errors.quantity ? "error" : ""}
                        />
                        {errors.quantity && (
                          <span className="error-message">
                            {errors.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <form className="delivery-form" onSubmit={handleSubmit}>
                    <h3>Delivery Information</h3>

                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={errors.name ? "error" : ""}
                      />
                      {errors.name && (
                        <span className="error-message">{errors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Delivery Address</label>
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className={errors.address ? "error" : ""}
                      />
                      {errors.address && (
                        <span className="error-message">{errors.address}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={errors.phone ? "error" : ""}
                      />
                      {errors.phone && (
                        <span className="error-message">{errors.phone}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Preferred Delivery Time</label>
                      <input
                        type="datetime-local"
                        value={formData.deliveryTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deliveryTime: e.target.value,
                          })
                        }
                        className={errors.deliveryTime ? "error" : ""}
                      />
                      {errors.deliveryTime && (
                        <span className="error-message">
                          {errors.deliveryTime}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Payment Method</label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            paymentMethod: e.target.value,
                          })
                        }
                      >
                        <option value="cash">Cash on Delivery</option>
                        <option value="card">Credit Card</option>
                      </select>
                    </div>

                    <div className="order-summary">
                      <h4>Order Summary</h4>
                      <p>
                        {selectedItem.name} x {quantity}
                      </p>
                      <p>
                        Total: ₹{(selectedItem.price * quantity).toFixed(2)}/-
                      </p>
                    </div>

                    <button type="submit" className="place-order-btn">
                      Confirm Order
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Collections;
