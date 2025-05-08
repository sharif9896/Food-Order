import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-200 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Welcome to OZOE
            </h1>
            <p className="text-xl text-white mb-8">
              Delivering Happiness, One Meal at a Time
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="all.jpg" // Replace with actual image URL
              alt="Delicious food"
              className="rounded-lg shadow-xl h-64 w-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-6">
              Born from a passion for great food and convenience, OZOE started
              as a small local service and grew into your favorite food delivery
              partner. We connect food lovers with the best local restaurants
              and deliver meals faster than you can say "Bon appétit!"
            </p>
            <div className="bg-orange-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                Why Choose OZOE?
              </h3>
              <ul className="list-disc pl-6 text-orange-700">
                <li>Lightning-fast delivery</li>
                <li>Curated restaurant partners</li>
                <li>Real-time order tracking</li>
                <li>24/7 customer support</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-6">
            <img
              src="fl.jpg" // Replace with actual image URL
              alt="Fresh ingredients"
              className="rounded-lg h-48 w-full object-cover shadow-md"
            />
            <img
              src="hd.jpg" // Replace with actual image URL
              alt="Happy delivery"
              className="rounded-lg h-48 w-full object-cover shadow-md"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-4xl font-bold text-orange-600 mb-2">15k+</h3>
            <p className="text-gray-600">Meals Delivered</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-4xl font-bold text-orange-600 mb-2">30min</h3>
            <p className="text-gray-600">Average Delivery Time</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-4xl font-bold text-orange-600 mb-2">50+</h3>
            <p className="text-gray-600">Partner Restaurants</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl text-orange-800 mb-6">
            Follow Our Food Journey
          </h3>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-orange-600 hover:text-orange-800">
              <FaFacebook size={28} />
            </a>
            <a href="#" className="text-orange-600 hover:text-orange-800">
              <FaInstagram size={28} />
            </a>
            <a href="#" className="text-orange-600 hover:text-orange-800">
              <FaTwitter size={28} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
