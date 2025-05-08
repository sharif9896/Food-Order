import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { search_barAction } from "../store/search_bar";
import { LiaBoxOpenSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const showsearch = useSelector((store) => store.search_bar);
  const setshowsearch = () => {
    dispatch(search_barAction.showsearch());
  };
  const [visible, setvisible] = useState([]);
  const heart = useSelector((store) => store.Heart);
  const cart = useSelector((store) => store.cart);
  const search = useSelector((store) => store.Search_products);
  const dispatch = useDispatch();
  // console.log(cart);
  const getcartcount = () => {
    let totalcount = 0;
    for (const items in cart) {
      for (const item in cart[items]) {
        try {
          if (cart[items][item] > 0) {
            totalcount += cart[items][item];
          }
        } catch (e) {}
      }
    }
    return totalcount;
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
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

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}api/user/logout`);
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <nav className="bg-orange-500 text-white fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Desktop Menu */}
            <div className="flex items-center">
              <MdOutlineFastfood className="h-8 w-8" />
              <Link onClick={() => window.scrollTo(0, 0)} to="/">
                <span className="ml-2 text-xl font-bold">OZOE</span>
              </Link>
              {/* Desktop Navigation */}
              <div className="hidden md:block ml-10">
                <div className="flex space-x-4">
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to="/"
                    className="px-3 py-2 rounded-md hover:bg-orange-700"
                  >
                    Home
                  </Link>
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to="/Collections"
                    className="px-3 py-2 rounded-md hover:bg-orange-700"
                  >
                    Foods
                  </Link>
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to="About"
                    className="px-3 py-2 rounded-md hover:bg-orange-700"
                  >
                    About
                  </Link>
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to="Contact"
                    className="px-3 py-2 rounded-md hover:bg-orange-700"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Icons and Mobile Menu Button */}
            <div className="flex items-center">
              {/* Desktop Icons */}
              <div className="flex items-center space-x-4">
                <Link onClick={() => window.scrollTo(0, 0)} to={"/Collections"}>
                  <div className="" onClick={() => setshowsearch()}>
                    <FiSearch className="h-6 w-6 cursor-pointer hover:text-orange-300" />
                  </div>
                </Link>
                <div className="relative">
                  <Link onClick={() => window.scrollTo(0, 0)} to="/Heart">
                    <FiHeart className="h-6 w-6 cursor-pointer hover:text-orange-300" />
                    <div className="w-4 bg-orange-300 text-orange-900 text-center rounded-full leading-4 absolute right-[-8px] bottom-[10px] aspect-square text-[10px]">
                      {heart.length}
                    </div>
                  </Link>
                </div>
                <div className="relative">
                  <Link onClick={() => window.scrollTo(0, 0)} to="/OrderPage">
                    <LiaBoxOpenSolid className="h-6 w-6 cursor-pointer hover:text-orange-300" />
                    <div className="w-4 bg-orange-300 text-orange-900 text-center rounded-full leading-4 absolute right-[-6px] bottom-[10px] aspect-square text-[10px]">
                      {visible.length}
                    </div>
                  </Link>
                </div>

                {/* Profile Dropdown */}
                <div className="hidden md:block group relative">
                  <Link to={"/Login"}>
                    <FiUser className="h-6 w-6 cursor-pointer hover:text-orange-300" />
                  </Link>
                  <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                      <Link
                        to={"/ProfilePage"}
                        className="cursor-pointer hover:text-black"
                      >
                        My Profile
                      </Link>
                      <p className="cursor-pointer hover:text-black">Orders</p>
                      {isLoggedIn ? (
                        <p
                          className="cursor-pointer hover:text-black"
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      ) : (
                        <Link
                          onClick={() => window.scrollTo(0, 0)}
                          to={"/Login"}
                          className="cursor-pointer hover:text-black"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button {isLoggedIn ? (
                      <p
                        className="cursor-pointer hover:text-black"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    ) : (
                      <a
                        to={"/Login"}
                        className="cursor-pointer hover:text-black"
                      >
                        Login
                      </a>
                    )} */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-orange-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FiX className="h-6 w-6" />
                ) : (
                  <FiMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-2">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/"
                  className="block px-3 py-2 rounded-md hover:bg-orange-700"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/Collections"
                  className="block px-3 py-2 rounded-md hover:bg-orange-700"
                >
                  Foods
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/About"
                  className="block px-3 py-2 rounded-md hover:bg-orange-700"
                >
                  About
                </Link>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  to="/Contact"
                  className="block px-3 py-2 rounded-md hover:bg-orange-700"
                >
                  Contact
                </Link>
                <div className="border-t border-orange-500 pt-2">
                  <Link
                    onClick={() => setIsMenuOpen(false)}
                    to="/ProfilePage"
                    className="block px-3 py-2 rounded-md hover:bg-orange-700"
                  >
                    Profile
                  </Link>
                  {isLoggedIn ? (
                    <p
                      className="block px-3 py-2 rounded-md hover:bg-orange-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </p>
                  ) : (
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      to={"/Login"}
                      className="block px-3 py-2 rounded-md hover:bg-orange-700"
                    >
                      Login
                    </Link>
                  )}
                  {/* <a
                    to="#"
                    className="block px-3 py-2 rounded-md hover:bg-orange-700"
                  >
                    Logout
                  </a> */}
                </div>
                {/* <div className="flex items-center space-x-4 px-3 py-2">
                  <FiSearch className="h-6 w-6" />
                  <FiHeart className="h-6 w-6" />
                  <FiShoppingCart className="h-6 w-6" />
                </div> */}
              </div>
            </div>
          )}
        </div>
      </nav>
      <br />
      <br />
    </>
  );
};

export default Navbar;
