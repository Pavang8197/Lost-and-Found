import LostItem from "../models/LostItem.js";
import cloudinary from "../config/cloudinary.js";

export const reportLostItem = async (req, res) => {
  try {
    const { title, description, location, date } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    const item = new LostItem({
      title,
      description,
      location,
      date,
      imageUrl,
      user: req.user.id,
    });

    await item.save();

    res.status(201).json({ message: "Lost item reported successfully", item });
  } catch (err) {
    console.error("Error reporting lost item:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ createdAt: -1 });
    res.json(items);          // ⬅ VERY IMPORTANT → must return an ARRAY
  } catch (err) {
    console.error("Error fetching lost items:", err);
    res.status(500).json({ message: "Server error" });
  }
};
