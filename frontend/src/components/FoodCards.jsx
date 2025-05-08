import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartAction } from "../store/Cart";
import { FaBoxOpen } from "react-icons/fa";

const FoodCards = () => {
  const [likedItems, setLikedItems] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const carts = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const product = useSelector((store) => store.items);

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

  const handleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
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
    dispatch(cartAction.setCart(cartdata));
  };
  //   const handleImageSlide = (id, direction) => {
  //     setImageIndexes(prev => {
  //       const currentIndex = prev[id] || 0;
  //       const item = products.find(item => item.id === id);
  //       const maxIndex = item.images.length - 1;

  //       return {
  //         ...prev,
  //         [id]: direction === 'next'
  //           ? currentIndex < maxIndex ? currentIndex + 1 : 0
  //           : currentIndex > 0 ? currentIndex - 1 : maxIndex
  //       };
  //     });
  //   };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-orange-600">
        Our Special Dishes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.map((item) => (
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
                style={{
                  transform: `translateX(-${
                    (imageIndexes[item._id] || 0) * 100
                  }%)`,
                }}
              >
                <img
                  key={item._id}
                  src={item.image.url}
                  alt={item.title}
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
        ))}
      </div>
    </div>
  );
};

export default FoodCards;
