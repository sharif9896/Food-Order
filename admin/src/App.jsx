import React from "react";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Home />
    </>
  );
}

export default App;
