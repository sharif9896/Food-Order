import express from "express";
import {
  createfood,
  deletefood,
  foodlist,
  getfoods,
  singlefood,
  updatefoods,
} from "../controllers/foodcontroller.js";
import adminmiddleware from "../middleware/adminmiddleware.js";

const foodrouter = express.Router();

foodrouter.post("/create", adminmiddleware, createfood);
foodrouter.get("/getfoods", adminmiddleware, getfoods);
foodrouter.get("/singlefood/:id", singlefood);
foodrouter.put("/updatefood/:foodId", adminmiddleware, updatefoods);
foodrouter.delete("/deletefood/:foodId", adminmiddleware, deletefood);
foodrouter.get("/foodlists", foodlist);

// foodrouter.post("/create", createfood);

export default foodrouter;
