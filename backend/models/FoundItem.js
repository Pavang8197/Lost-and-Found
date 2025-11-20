import mongoose from "mongoose";


const foundSchema = new mongoose.Schema({
title: String,
description: String,
location: String,
date: String,
image: String,
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});


export default mongoose.model("FoundItem", foundSchema);