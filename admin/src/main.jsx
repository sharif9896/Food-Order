import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Foods from "./pages/Foods.jsx";
import Orders from "./pages/Orders.jsx";
import Settings from "./pages/Settings.jsx";
import UpdateFoods from "./pages/UpdateFoods.jsx";
import Signin from "./pages/Signin.jsx";
import { Provider } from "react-redux";
import ecommerce from "../store/index.js";
import DeleteFoods from "./pages/DeleteFoods.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AdminLogin /> },
      { path: "/admin/signup", element: <AdminSignup /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/foods", element: <Foods /> },
      { path: "/orders", element: <Orders /> },
      { path: "/settings", element: <Settings /> },
      { path: "/signin", element: <Signin /> },
      { path: "/admin/update-foods/:id", element: <UpdateFoods /> },
      { path: "/deletefood/:id", element: <DeleteFoods /> },
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
