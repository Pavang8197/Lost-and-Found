// backend/controllers/foundController.js

import FoundItem from "../models/FoundItem.js";
import cloudinary from "../config/cloudinary.js";

export const reportFoundItem = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "lost_and_found" },
        (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ msg: "Image upload failed" });
          }

          imageUrl = result.secure_url;
          finish();
        }
      );

      req.file.stream.pipe(uploadStream);
    } else {
      finish();
    }

    function finish() {
      const item = new FoundItem({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        image: imageUrl,
        user: req.user.id,
      });

      item.save();
      res.json(item);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
