import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog Title is Required"],
    },
    content: {
      type: String,
      required: [true, "Blog Content is Required"],
    },
    image: {
      type: String,
      required: [true, "Image is required for Blog"],
    },
    category:{
      type: String,
      required: [true, "Category is Required"],
    },
    slug:{
      type: String,
      required: [true, "Slug is Required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User id required for blog"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;
