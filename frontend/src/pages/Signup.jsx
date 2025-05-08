import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';
import { BACKEND_URL } from "../../utils/utils";

const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hadlesubmit = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/user/signup`,
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
    } catch (e) {
        console.log(e);
        toast.error(response.data.message);
    }
  };
  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">
            {/* FreshBites Delivery */}
          </h1>
          <h2 className="text-xl text-gray-600">Create a new account</h2>
        </div>

        <form onSubmit={(e) => hadlesubmit(e)} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="Enter your full name"
                            value={name}
            onChange={(e) => setname(e.target.value)}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="Enter your email"
                            value={email}
            onChange={(e) => setemail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                placeholder="Enter your password"
                            value={password}
            onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
          onClick={()=>setIsSubmitting(true)}
            className="w-full bg-orange-600 text-white cursor-pointer py-3 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-orange-400"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link
              to="/Login"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              <FaSignInAlt className="inline mr-1" />
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
      {/* <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={(e) => hadlesubmit(e)}
          className="flex flex-col items-center w-[50%] sm:max-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mt-10">
            <p className="prata-regular text-3xl">Signup</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder=" Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder=" Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder=" Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password?</p>
            <Link to={"/Login"} className="cursor-pointer">
              Login Here
            </Link>
          </div>
          <button className="bg-black text-white font-light px-8 py-2 mt-4">
            Signup
          </button>
        </form>
      </div> */}
    </>
  );
};

export default Signup;
