import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shopping from "./pages/Shopping";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import ecommerce from "./store";
import Categories from "./components/Categories";
import Cart from "./pages/Cart";
import Place_Orders from "./pages/Place_Orders";
import Signup from "./pages/Signup";
import FoodDelivery from "./components/FoodDelivery";
import FoodOrder from "./components/FoodOrder";
import OrderPage from "./components/OrderPage";
import Heart from "./pages/Heart";
import ProfilePage from "./pages/FoodProfile";
import FoodProfile from "./pages/FoodProfile";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Shopping", element: <Shopping /> },
      { path: "/Collections", element: <Collections /> },
      { path: "/About", element: <About /> },
      { path: "/Contact", element: <Contact /> },
      { path: "/Products/:productId", element: <Product /> },
      { path: "/Login ", element: <Login /> },
      { path: "/Categories/:category/:subcategory", element: <Categories /> },
      { path: "/Cart", element: <Cart /> },
      { path: "/Login", element: <Login /> },
      { path: "Signup", element: <Signup /> },
      { path: "/Place_Orders", element: <Place_Orders /> },
      { path: "/OrderPage", element: <OrderPage /> },
      { path: "/FoodOrder", element: <FoodOrder /> },
      { path: "/Heart", element: <Heart /> },
      { path: "/ProfilePage", element: <FoodProfile /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={ecommerce}>
      <RouterProvider router={route}></RouterProvider>
    </Provider>
  </StrictMode>
);
