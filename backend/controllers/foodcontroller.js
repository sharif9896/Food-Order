import { v2 as cloudinary } from "cloudinary";
import foodmodel from "../models/foodmodel.js";

const createfood = async (req, res) => {
  const { title, description, price, discount, ratings, category,buttonText, tags } =
    req.body;
  const { adminId } = req;
  try {
    const { image } = req.files;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "Error in fileing an image" });
    }
    if (!title || !description || !price || !ratings) {
      return res.status(400).json({ error: "All Fields are required!" });
    }
    const allowedformate = ["image/png", "image/jpeg"];
    if (!allowedformate.includes(image.mimetype)) {
      return res.status(402).json({ error: "Error in image formate!" });
    }

    const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
    const fooddata = {
      title,
      description,
      price,
      discount,
      ratings,
      tags,
      category,
      image: {
        public_id: cloud_response.public_id,
        url: cloud_response.url,
      },
      buttonText,
      creatorId: adminId,
    };
    const food = await foodmodel.create(fooddata);
    return res.status(200).json({ message: "Created Sucessfully..", food });
  } catch (e) {
    console.log(e);
    return res.status(402).json({ error: "Error in creating a food!" });
  }
};
const getfoods = async (req, res) => {
  const { adminId } = req;
  try {
    const foods = await foodmodel.find({ creatorId: adminId }, {});
    return res.status(200).json({ foods });
  } catch (e) {
    console.log(e);
    return res.status(402).json({ error: "Error in getting a food!" });
  }
};
const foodlist = async (req, res) => {
  try {
    const foodlists = await foodmodel.find({});
    return res.status(200).json({ foodlists });
  } catch (e) {
    return res.status(402).json({ error: "Error in Getting all foods" });
  }
};
const singlefood = async (req, res) => {
  try {
    const food = await foodmodel.findById(req.params.id);
    return res.status(200).json({ food });
  } catch (e) {
    console.log(e);
    return res.status(402).json({ error: "Error in getting a food!" });
  }
};
const updatefoods = async (req, res) => {
  try {
    const { title, description, price, ratings } = req.body;
    const { foodId } = req.params;
    const { adminId } = req;

    // Validate food ID
    if (!foodId)
      return res.status(400).json({ message: "Food ID is required" });

    let cloud_response;
    if (req.files && req.files.file) {
      const file = req.files.file;
      cloud_response = await cloudinary.uploader.upload(file.tempFilePath);
    }

    const updatedFood = await foodmodel.findByIdAndUpdate(
      {
        _id: foodId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        ratings,
        ...(cloud_response && {
          image: {
            public_id: cloud_response.public_id,
            url: cloud_response.url,
          },
        }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      food: updatedFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const deletefood = async (req, res) => {
  const { adminId } = req;
  const { foodId } = req.params;
  try {
    const food = await foodmodel.findOneAndDelete({
      _id: foodId,
      creatorId: adminId,
    });
    return res.status(200).json({ message: "Deleted Sucessfully..", food });
  } catch (e) {
    console.log(e);
    return res.status(402).json({ error: "Error in deleting a food!" });
  }
};

export { createfood, getfoods, singlefood, updatefoods, deletefood, foodlist };
