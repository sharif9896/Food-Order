import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarker, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-200 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white">
            We're here to help! Reach out for any questions or feedback.
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-orange-600 mb-6">
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows="5"
                  className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <button className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Graphics */}
          <div className="space-y-8">
            <div className="bg-orange-100 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-orange-800 mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-orange-600 mr-4 text-xl" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-orange-600 mr-4 text-xl" />
                  <span className="text-gray-700">support@ozoe.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarker className="text-orange-600 mr-4 text-xl" />
                  <span className="text-gray-700">
                    123 Food Street, Culinary City
                  </span>
                </div>
              </div>
            </div>

            <img
              src="nf.jpg" // Replace with actual image
              alt="Contact illustration"
              className="rounded-xl h-64 w-full object-cover shadow-md"
            />

            {/* Social Links */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h3 className="text-xl text-orange-800 mb-4">
                Follow Us On Social Media
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

        {/* Map Section */}
        <div className="mt-16 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="OZOE Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.517892465659!2d78.60543737380513!3d12.679584421215834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bada9a0844654af%3A0xe6cb4caa43604c8d!2sDawath%20Caterers!5e0!3m2!1sen!2sin!4v1718049396462!5m2!1sen!2sin" // Replace with actual map URL
            className="w-full h-96 border-0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
