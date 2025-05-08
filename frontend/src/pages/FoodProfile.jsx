import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/utils";
// import "./FoodProfile.css";

const FoodProfile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [visible, setvisible] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return (window.location.href = "/Login");
  }
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return (window.location.href = "/Login");
    }

    const meth = async () => {
      try {
        const foodss = await axios.get(
          `${BACKEND_URL}api/user/orders`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(user).token}`,
            },
          }
        );
        // console.log(foodss.data.orders);
        setvisible(foodss.data.orders);
      } catch (error) {
        console.log("Error in fetching orders ", error);
        // toast.error(error.response.data.error);
      }
    };
    meth();
  }, []);

  const heart = useSelector((store) => store.Heart);
  const product = useSelector((store) => store.items);
  const final = product.filter((itemid) => heart.includes(itemid._id));
  // Mock data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah@foodie.com",
    phone: "+1 234 567 890",
    addresses: [
      { id: 1, primary: true, address: "123 Food Street, Apt 4B, New York" },
      { id: 2, primary: false, address: "456 Burger Lane, Suite 12, Brooklyn" },
    ],
    dietaryPreferences: ["Vegetarian", "Gluten-Free"],
    favoriteRestaurants: ["Burger Palace", "Sushi Master", "Taco Heaven"],
    recentOrders: [
      {
        id: 1,
        date: "2023-08-15",
        restaurant: "Pizza Planet",
        total: "$28.50",
      },
      {
        id: 2,
        date: "2023-08-14",
        restaurant: "Noodle House",
        total: "$18.75",
      },
    ],
  };

  // console.log(final);
  return (
    <div className="food-profile-container">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="user-info">
            <h1>{user.user.name}</h1>
            <p className="foodie-status">Gold Foodie Member</p>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">45</span>
                <span className="stat-label">Orders</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1.2k</span>
                <span className="stat-label">Foodie Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`tab ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <i className="fas fa-receipt"></i> Orders
        </button>
        <button
          className={`tab ${activeTab === "favorites" ? "active" : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          <i className="fas fa-heart"></i> Favorites
        </button>
        <button
          className={`tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <i className="fas fa-cog"></i> Address
        </button>
      </div>

      <div className="profile-content">
        {activeTab === "orders" && (
          <div className="orders-section">
            <h2>
              <i className="fas fa-history"></i> Order History
            </h2>
            {visible.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-info">
                  <h3>{order.item.title}</h3>
                  <p>{order.deliveryTime}</p>
                </div>
                <div className="order-actions">
                  <span className="order-total">₹{order.total}/-</span>
                  <button className="btn reorder-btn">Ordered Placed</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="favorites-section">
            <div className="favorites-grid">
              {final.map((restaurant) => (
                <div key={restaurant._id} className="favorite-card">
                  <div className="restaurant-image">
                    <img src={restaurant.item.image.url} alt="" />
                  </div>
                  <h3>{restaurant.title}</h3>
                  <Link to="/Heart" className="btn order-now-btn">
                    Order Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-section">
            <div className="address-book">
              <h2>
                <i className="fas fa-map-marker-alt"></i> Saved Addresses
              </h2>
              {visible.map((address) => (
                <div key={address._id} className="address-card">
                  <p>{address.address}</p>
                  {address.address && (
                    <span className="primary-tag">Primary</span>
                  )}
                </div>
              ))}
              <button className="btn add-address-btn">
                <i className="fas fa-plus"></i> Check Your Address
              </button>
            </div>

            <div className="dietary-preferences">
              <h2>
                <i className="fas fa-carrot"></i> Dietary Preferences
              </h2>
              <div className="preferences-list">
                {userData.dietaryPreferences.map((pref) => (
                  <span key={pref} className="preference-tag">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodProfile;
