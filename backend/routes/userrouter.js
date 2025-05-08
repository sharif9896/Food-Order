import express from "express";
import {
  getorder,
  login,
  logout,
  order,
  orders,
  signup,
} from "../controllers/usercontroller.js";
import usermiddleware from "../middleware/usermidleware.js";
import adminmiddleware from "../middleware/adminmiddleware.js";
const userrouter = express.Router();

userrouter.post("/signup", signup);
userrouter.post("/login", login);
userrouter.get("/logout", logout);
userrouter.post("/order", order);
userrouter.get("/getorder", usermiddleware, getorder);
userrouter.get("/orders", usermiddleware, orders);

export default userrouter;
