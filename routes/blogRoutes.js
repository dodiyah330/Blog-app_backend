import Router from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  userBlogController,
} from "../controllers/blogController.js";

//router Object
const router = Router();

//get all blogs
router.get("/all-blog", getAllBlogsController);

//create a blog
router.post("/create-blog", createBlogController);

//update a blog
router.put("/update-blog/:id", updateBlogController);

//get a blog by id
router.get("/get-blog/:id", getBlogByIdController);

//delete a blog
router.delete("/delete-blog/:id", deleteBlogController);

//get all blogs for a user
router.get("/user-blog/:id", userBlogController);

export default router;
