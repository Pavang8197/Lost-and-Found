import express from "express";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";
import {
  reportFoundItem,
  getFoundItems,
} from "../controllers/foundController.js";

const router = express.Router();

router.post("/report", auth, upload.single("image"), reportFoundItem);
router.get("/", getFoundItems);
router.get("/", async (req, res) => {
  const items = await FoundItem.find().sort({ createdAt: -1 });
  res.json(items);     // MUST RETURN ARRAY
});


export default router;
