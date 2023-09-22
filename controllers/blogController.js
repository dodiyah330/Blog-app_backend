import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

//retrive all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        massage: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      massage: "All blogs List",
      blogs,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    return res.status(500).send({
      success: false,
      massage: "Error in BlogController",
      error,
    });
  }
};
export const createBlogController = async (req, res) => {
  try {
    const { title, content, image, category, slug, user } = req.body;
    if (!title || !content || !image || !user || !category || !slug) {
      return res.status(400).send({
        success: false,
        massage: "All the fields are required",
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        massage: "Unable to find user",
      });
    }

    //using mongoose session for a Transaction

    const newblog = new blogModel({
      title,
      content,
      image,
      category,
      slug,
      user,
    });
    await newblog.save();
    existingUser.blogs.push(newblog);
    await existingUser.save();

    res.status(200).send({
      success: true,
      massage: "New blog Created",
      newblog,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    //session.abortTransaction();
    return res.status(400).send({
      success: false,
      massage: "Error in creating new blog",
      error,
    });
  }
};
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      massage: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    return res.status(400).send({
      success: false,
      massage: "Error Updating blog",
      error,
    });
  }
};
export const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(400).send({
        success: false,
        massage: "Can't Find Blog",
      });
    }
    return res.status(200).send({
      success: true,
      massage: "Blog Retrieved Successfully",
      blog,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    return res.status(400).send({
      success: false,
      massage: "Error retrieving blog",
      error,
    });
  }
};
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate("user");
    blog.user.blogs.remove(id);
    await blogModel.findByIdAndDelete(id);
    await blog.user.save();
    res.status(200).send({
      success: true,
      massage: "Blog Deleted Successfully",
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    return res.status(400).send({
      success: false,
      massage: "Error deleting blog",
      error,
    });
  }
};

export const userBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).populate("blogs");
    await user.populate("blogs");

    if (!user) {
      return res.status(404).send({
        success: false,
        massage: "User not found",
      });
    }
    return res.status(200).send({
      blogCount: user.blogs.length,
      massage: "All blogs",
      blogs: user.blogs,
      success: true,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    res.status(400).send({
      success: false,
      massage: "error fetching blogs",
      error,
    });
  }
};
