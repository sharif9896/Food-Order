import React, { useState } from 'react';
// import './FoodDelivery.css'; // Reuse previous CSS and add new styles

const FoodDelivery = () => {
  const [showProductPage, setShowProductPage] = useState(false);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    deliveryTime: '',
    paymentMethod: 'cash'
  });
  const [errors, setErrors] = useState({});

  // Sample food items
  const menuItems = [
    { id: 1, name: 'Margherita Pizza', price: 12.99, description: 'Classic tomato and mozzarella', image: 'pizza.jpg' },
    { id: 2, name: 'Burger Meal', price: 9.99, description: 'Beef burger with fries', image: 'burger.jpg' },
    { id: 3, name: 'Sushi Platter', price: 18.99, description: 'Assorted sushi selection', image: 'sushi.jpg' },
  ];

  const addToCart = (item) => {
    setCart([...cart, {...item, quantity: 1}]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Invalid phone number';
    if (!formData.deliveryTime) newErrors.deliveryTime = 'Please select delivery time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && cart.length > 0) {
      // Handle order submission
      console.log('Order submitted:', { ...formData, cart });
      alert('Order placed successfully!');
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="food-delivery-container">
      {!showProductPage ? (
        <div className="cta-section">
          <h2>Hungry? Order Now!</h2>
          <button
            className="order-now-button"
            onClick={() => setShowProductPage(true)}
          >
            Order Now
          </button>
        </div>
      ) : (
        <div className="product-page">
          <h2 className="page-title">Our Menu</h2>

          <div className="menu-grid">
            {menuItems.map(item => (
              <div key={item.id} className="food-card">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>

          <div className="order-section">
            <div className="cart-summary">
              <h3>Your Order</h3>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
              <div className="total-amount">
                <strong>Total: ${totalAmount.toFixed(2)}</strong>
              </div>
            </div>

            <form className="delivery-form" onSubmit={handleSubmit}>
              <h3>Delivery Information</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Preferred Delivery Time</label>
                <input
                  type="datetime-local"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
                  className={errors.deliveryTime ? 'error' : ''}
                />
                {errors.deliveryTime && <span className="error-message">{errors.deliveryTime}</span>}
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit Card</option>
                </select>
              </div>

              <button type="submit" className="place-order-button">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDelivery;
