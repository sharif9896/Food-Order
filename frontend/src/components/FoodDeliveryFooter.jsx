import React from "react";
import { FaPhone, FaEnvelope, FaUtensils } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";

const FoodDeliveryFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <MdOutlineFastfood className="text-orange-600 text-3xl mr-2" />
              <a href="/">
                <span className="ml-2 text-xl font-bold">OZOE</span>
              </a>
            </div>
            <p className="text-sm leading-6">
              We're passionate about delivering exceptional dining experiences
              straight to your door. Our team is dedicated to providing
              top-notch service, ensuring your satisfaction from menu selection
              to meal delivery. We go the extra mile to make every bite
              memorable.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:ml-12">
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {["Home", "Menu", "About Us", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaPhone className="text-orange-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Contact Number</p>
                  <p className="text-sm">+1 (888) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-orange-500 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Email Address</p>
                  <p className="text-sm">contact@freshbites.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FreshBites Delivery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FoodDeliveryFooter;
