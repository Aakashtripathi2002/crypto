import mongoose from "mongoose";

const CryptoAssetSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true }, // file path
  min_price: { type: Number, required: true },
  max_price: { type: Number, required: true },
  current_price: { type: Number, default: 0 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("CryptoAsset", CryptoAssetSchema);
