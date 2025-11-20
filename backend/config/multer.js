// backend/config/multer.js

import multer from "multer";

// store file temporarily on server
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
