import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaHeadset, FaCheckCircle } from 'react-icons/fa';

const FoodHeader = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      setShowAlert(true);
      setEmail('');
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <header className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-3 rounded-full mb-6">
            <FaCheckCircle className="text-orange-600 text-2xl" />
            <h1 className="text-3xl font-bold text-orange-600">
              Satisfaction Guarantee
            </h1>
          </div>
          <p className="text-xl text-gray-600 mt-4">
            Not happy with your meal? We'll replace it immediately
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaClock className="text-orange-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">
                30-Minute Delivery Promise
              </h2>
            </div>
            <p className="text-gray-600 text-lg">
              Get your food within 30 minutes or get 20% off your next order
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaHeadset className="text-orange-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-800">24/7 Support</h2>
            </div>
            <p className="text-gray-600 text-lg">
              Round-the-clock support for all your dining needs
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-orange-600 text-white py-12 px-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-4">Subscribe Now & Get 20% Off!</h3>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
          {showAlert && (
            <div className="mt-4 text-green-300">
              Success! Check your email for confirmation
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default FoodHeader;
