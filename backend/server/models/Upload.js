import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  carModel: String,
  price: Number,
  Phone: String,
  City: String,
  Copies: Number,
  images: [{ url: String }],
});

const UploadModel = mongoose.model("Upload Document", uploadSchema);

export default UploadModel;
