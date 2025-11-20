import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import lostRoutes from "./routes/lost.js";
import foundRoutes from "./routes/found.js";


dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);


app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));