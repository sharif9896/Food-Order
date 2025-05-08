import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../utils/utils";

const OrderPage = () => {
  // Sample order data

  const [items, setitems] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/Login";
    }
    const method = async () => {
      const response = await axios.get(
        `${BACKEND_URL}api/user/getorder`
      );
      setitems(response.data.order);
      console.log(response.data.order);
      if (response.data.order.length === 0) {
        toast.error("No Order Found!");
        window.location.href = "/";
      }
    };
  });

  const orderDetails = {
    items: [
      { id: 1, name: "Margherita Pizza", quantity: 2, price: 12.99 },
      { id: 2, name: "Orange Juice", quantity: 1, price: 4.99 },
      { id: 3, name: "Garlic Bread", quantity: 1, price: 5.49 },
    ],
    customer: {
      name: "John Doe",
      address: "123 Main Street, Apt 4B\nNew York, NY 10001",
      phone: "(555) 123-4567",
    },
    total: 34.46,
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/Login";
    }
    const method = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}api/user/getorder`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(user).token}`,
            },
          }
        );
        setitems(response.data.order);
          console.log(response.data.order);

        // if (response.data.order.length === 0) {
        //   toast.error("No Order Found!");
        //   window.location.href = "/";
        // }
      } catch (e) {
        console.log(e);
        toast.error("Error in fetching order!");
      }
    };
    method();
  }, []);

  return (
    <div className="order-container">
      {/* <header className="order-header"> */}
      <h1>🍕 Your Order</h1>
      {/* </header> */}
      {items.map((item) => (
        <div className="order-content">
          {/* Order Summary Section */}
          <section className="order-section">
            <h2>Order Summary</h2>
            <div className="order-items">
              <img className="w-130" src={item.item.image.url} alt="" />
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <h3>{item.item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="item-price">₹{item.total}</div>
              </div>
            </div>
            <div className="order-total">
              <h3>Total: ₹{item.total}</h3>
            </div>
          </section>

          {/* Customer Address Section */}
          <section className="order-section">
            <h2>Delivery Details</h2>
            <div className="address-card">
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Address:</strong>
              </p>
              <pre>{item.address}</pre>
              <p>
                <strong>Phone:</strong> {item.phone}
              </p>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

// CSS Styles
const styles = `
  .order-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }

  .order-header {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #FF6B00, #FF8C00);
    color: white;
    border-radius: 15px;
    margin-bottom: 2rem;
  }

  .order-header h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  .order-section {
    background: #FFF5E6;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .order-section h2 {
    color: #FF6B00;
    margin-top: 0;
    border-bottom: 2px solid #FFA726;
    padding-bottom: 0.5rem;
  }

  .order-items {
    margin: 1rem 0;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    margin: 0.5rem 0;
    transition: transform 0.2s;
  }

  .order-item:hover {
    transform: translateX(5px);
  }

  .item-price {
    color: #FF6B00;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .address-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    line-height: 1.6;
  }

  .address-card pre {
    white-space: pre-wrap;
    font-family: inherit;
    margin: 0.5rem 0;
  }

  .order-total {
    text-align: right;
    padding: 1rem;
    background: #FFE0B2;
    border-radius: 8px;
    margin-top: 1rem;
  }

  .order-total h3 {
    color: #FF6B00;
    margin: 0;
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    .order-container {
      padding: 10px;
    }

    .order-header h1 {
      font-size: 2rem;
    }
  }
`;

// Inject styles
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

export default OrderPage;
