import CryptoAsset from "../models/CryptoAsset.js";

export const addAsset = async (req, res) => {
  try {
    const { symbol, name, min_price, max_price } = req.body;
    const icon = req.file ? `/uploads/${req.file.filename}` : null;

    const asset = await CryptoAsset.create({
      symbol, name, icon, min_price, max_price, createdBy: req.user.id
    });

    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssets = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? { createdBy: req.user.id } : {};
    const assets = await CryptoAsset.find(filter);
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
