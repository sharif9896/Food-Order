import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  item: { type: Object, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  deliveryTime: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  total: { type: Number, required: true },
});
const ordermodel =
  mongoose.models.order || mongoose.model("orders", orderSchema);
export default ordermodel;
