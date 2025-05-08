import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardContainer = styled.div`
  // text-align: center;
`;

const Container = styled.div`
  display: flex;
  // min-height: 100vh;
  background-color: #1e1e1e;
  // color: white;
`;

const MainContent = styled.div`
  flex: 1;
  // padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Foods = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    ratings: "",
    image: null,
  });

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [discount, setdiscount] = useState("");
  const [ratings, setratings] = useState("");
  const [tags, settags] = useState("");
  const [category, setcategory] = useState("");
  const [btext, setbtext] = useState("");
  const [image, setimage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("admin"));
    if (!token) {
      navigate("/");
      return;
    }
    // You can send formData to your API here
    try {
      const tokens = token.token;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("ratings", ratings);
      formData.append("tags", tags);
      formData.append("category", category);
      formData.append("buttonText", btext);
      formData.append("image", image);
      const foods = await axios.post(
        `http://localhost:3956/api/product/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        }
      );
      console.log(foods);
      toast.success(foods.data.message);
      navigate("/dashboard");
      settitle("");
      setdescription("");
      setprice("");
      setratings("");
      setimage(null);
      setImagePreview("");
    } catch (e) {
      console.log(e);
      toast.error("Error in creating food");
    }
  };
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setimage(file);
    };
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header />
        <DashboardContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Add New Food Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={(e) => settitle(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  onChange={(e) => setdescription(e.target.value)}
                  rows="3"
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  onChange={(e) => setprice(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">
                  Discount-Price (₹)
                </label>
                <input
                  type="number"
                  name="discount-price"
                  onChange={(e) => setdiscount(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700">Ratings (0–5)</label>
                <input
                  type="number"
                  name="ratings"
                  step="0.1"
                  min="0"
                  max="5"
                  onChange={(e) => setratings(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Tags </label>
                <input
                  type="text"
                  name="tags"
                  onChange={(e) => settags(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Category </label>
                <input
                  type="text"
                  name="category"
                  onChange={(e) => setcategory(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Order-Button-Text </label>
                <input
                  type="text"
                  name="order-button-text"
                  onChange={(e) => setbtext(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Food Image</label>
                <div className="flex items-center justify-center">
                  <img
                    src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                    alt="Image"
                    className="w-full max-w-sm h-auto rounded-md object-cover"
                  />
                </div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={changePhotoHandler}
                  className="w-full mt-1"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                style={{
                  backgroundColor: "#ff6600",
                  cursor: "pointer",
                }}
                className="w-full  text-white py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition-all"
              >
                Add Food
              </motion.button>
            </form>
          </motion.div>
        </DashboardContainer>
        <Footer />
      </MainContent>
    </Container>
  );
};

export default Foods;
