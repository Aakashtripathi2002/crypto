// priceGenerator.js
import CryptoAsset from "../models/CryptoAsset.js";
import { getIO } from "./socket.js";

export const generatePrices = async () => {
  try {
    const assets = await CryptoAsset.find();
    const updatedAssets = await Promise.all(
      assets.map(async (asset) => {
        const randomPrice = (
          Math.random() * (asset.max_price - asset.min_price) + asset.min_price
        ).toFixed(2);
        asset.current_price = parseFloat(randomPrice);
        return asset.save();
      })
    );

    const io = getIO();
    io.emit("priceUpdate", updatedAssets);
  } catch (error) {
    console.error("Error updating prices:", error.message);
  }
};
