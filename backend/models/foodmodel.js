import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  ratings: { type: Number, required: true },
  tags: { type: String, required: true },
  category: { type: String, required: true },
  buttonText: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    url: { type: Array, required: true },
  },
  creatorId: { type: mongoose.Types.ObjectId, ref: "user" },
});

const foodmodel = mongoose.models.food || mongoose.model("foods", foodSchema);

export default foodmodel;
