import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const adminmodel = mongoose.models.admin || mongoose.model("admins", adminSchema);

export default adminmodel;
