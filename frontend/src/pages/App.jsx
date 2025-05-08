import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Ourpolysy from "../components/Ourpolysy";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "../components/Searchbar";
import FetchProducts from "../components/FetchProducts";
import FoodDeliveryPolicy from "../components/FoodDeliveryPolicy";
import FoodDeliveryFooter from "../components/FoodDeliveryFooter";
import Navbar from "../components/Navbar";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <div className="max-w-[1340px] mx-auto">
        <FetchProducts />
        <Searchbar />
        <ToastContainer />
        <Outlet />
        <FoodDeliveryPolicy />
        {/* <Ourpolysy />
        <Newsletter /> */}
        <FoodDeliveryFooter />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
