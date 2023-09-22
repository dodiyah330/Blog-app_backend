import Router from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../controllers/userControllers.js";

//router Object
const router = Router();

//get all the Users (get)
router.get("/all-users", getAllUsers);

//create user || Register new User (Post)

router.post("/register", registerController);

//Login (Post)

router.post("/login", loginController);

export default router;
