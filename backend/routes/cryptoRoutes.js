import { Router } from "express";
import { addAsset, getAssets } from "../controllers/cryptoController.js";
import {auth }from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = Router();
router.post("/", auth, upload.single("icon"), addAsset);
router.get("/", auth, getAssets);
export default router;
