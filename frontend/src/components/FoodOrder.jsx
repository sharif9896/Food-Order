import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import "./FoodOrder.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { heartAction } from "../store/Heart";
import { BACKEND_URL } from "../../utils/utils";
// const [imageIndexes, setImageIndexes] = useState({});
// const carts = useSelector((store) => store.cart);
// const dispatch = useDispatch();

// console.log(product);
const foodItems = [
  {
    id: 1,
    name: "Babu Biriyani",
    description: "Tasty authentic dum biryani",
    price: 490.0,
    images: ["/public/bb.jpg", "/public/hg.jfif"],
    tags: ["Best Seller", "Spicy"],
  },
  {
    id: 2,
    name: "Veg Biriyani",
    description: "Delicious vegetable biryani",
    price: 470.0,
    images: ["/public/sus.jpg", "/public/su.jpg", "/public/sa.jpg"],
    tags: ["Vegetarian"],
  },
  {
    id: 3,
    name: "Veg Biriyani",
    description: "Delicious vegetable biryani",
    price: 470.0,
    images: ["/public/sus.jpg", "/public/su.jpg"],
    tags: ["Vegetarian"],
  },
  // Add more items as needed
];

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 12.99,
    description: "Classic tomato and mozzarella",
    image: "pizza.jpg",
  },
  // Add more menu items as needed
];

const FoodOrder = () => {
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
  const heart = useSelector((store) => store.Heart);
  const handleOrderNow = (item) => {
    // Scroll to top of the page
    if (!user) {
      window.scrollTo(0, 0);
      navigate("/Login");
      return;
    }
    setSelectedItem(item);
    setQuantity(1); // Reset quantity when ordering new item
  };

  const handleLike = (id) => {
    // setLikedItems((prev) =>
    //   prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    // );
    dispatch(heartAction.setheart(id));
  };

  const handledislike = (id) => {
    dispatch(heartAction.removeheart(id));
  };

  // console.log(heart);
  // console.log(user.user._id);

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
        user: user.user._id,
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

        useEffect(() => {
          const user = localStorage.getItem("user");
          const log = async () => {
            try {
              const response = await axios.get(
                `http://localhost:3956/api/user/logout`
              );
              // toast.success(response.data.message);
              localStorage.removeItem("user");
              // setIsLoggedIn(false);
            } catch (error) {
              console.log("Error in logging out ", error);
              // toast.error(error.response.data.error);
            }
          };
          log();
        }, [foodss.data.message]);
      };
      meth();
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">
        Our Special Dishes
      </h1>
      {!selectedItem ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.map((item) => (
            <div className="" key={item._id}>
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
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    <button
                      onClick={() => handleLike(item._id)}
                      className="text-2xl hover:text-orange-500 transition-colors"
                    >
                      {heart.includes(item._id) ? (
                        <FaHeart
                          onClick={() => handledislike(item._id)}
                          className="text-red-500"
                        />
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
          <button className="back-button" onClick={() => setSelectedItem(null)}>
            ← Back to Menu
          </button>

          <div className="product-details">
            <img src={selectedItem.image.url} alt={selectedItem.title} />
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
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  className={errors.quantity ? "error" : ""}
                />
                {errors.quantity && (
                  <span className="error-message">{errors.quantity}</span>
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
                  setFormData({ ...formData, deliveryTime: e.target.value })
                }
                className={errors.deliveryTime ? "error" : ""}
              />
              {errors.deliveryTime && (
                <span className="error-message">{errors.deliveryTime}</span>
              )}
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
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
              <p>Total: ₹{(selectedItem.price * quantity).toFixed(2)}/-</p>
            </div>

            <button type="submit" className="place-order-btn">
              Confirm Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FoodOrder;
