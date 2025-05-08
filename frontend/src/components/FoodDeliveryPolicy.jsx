import React, { useState } from "react";
import { FaExchangeAlt, FaClock, FaHeadset, FaEnvelope } from "react-icons/fa";

const FoodDeliveryPolicy = () => {
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setShowAlert(true);
      setEmail("");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const features = [
    {
      icon: <FaExchangeAlt className="w-6 h-6" />,
      title: "Satisfaction Guarantee",
      text: "Not happy with your meal? We'll replace it immediately",
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "30-Minute Delivery Promise",
      text: "Get your food within 30 minutes or get 20% off next order",
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: "24/7 Support",
      text: "Round-the-clock support for all your dining needs",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-orange-600 mb-8 text-center">
        FreshBites Delivery
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-orange-500 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-orange-100 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          Subscribe Now & Get 20% Off!
        </h2>
        <p className="mb-6 text-gray-700">
          Get exclusive deals, early menu access, and special offers
        </p>

        <form
          onSubmit={handleSubscribe}
          className="max-w-md mx-auto flex gap-4"
        >
          <div className="flex-1">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            SUBSCRIBE
          </button>
        </form>

        {showAlert && (
          <div className="mt-4 text-green-600">
            Thanks for subscribing! Check your email for confirmation.
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDeliveryPolicy;
