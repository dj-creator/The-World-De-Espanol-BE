const mongoose = require("mongoose");

const Blog = new mongoose.Schema(
  {
    img:{type:String},
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
  },
  {
    //gives the time blog was posted
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", Blog);
