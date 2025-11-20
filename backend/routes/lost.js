import express from "express";
import { reportLostItem, getLostItems } from "../controllers/lostController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";

const router = express.Router();

// POST → Report a lost item
router.post("/report", auth, upload.single("image"), reportLostItem);

// GET → Fetch all lost items
router.get("/", getLostItems);

export default router;
