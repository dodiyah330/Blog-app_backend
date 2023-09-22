import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
//register new user
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        massage: "Please Fill all Fields",
      });
    }

    //existing user

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        massage: "User Already Exist",
      });
    }

    //hashing password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //save new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).send({
      success: true,
      massage: "new user created",
      newUser,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    return res.status(500).send({
      massage: "Error In Register Callback",
      success: false,
      error,
    });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users Data",
      users,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    res.status(500).send({
      massage: "error In Retriving all the users",
      success: false,
      error,
    });
  }
};

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        massage: "All the fileds are required",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User doen't exist",
      });
    }

    const checkPass = bcrypt.compare(password, user.password);

    if (!checkPass) {
      return res.status(401).send({
        success: false,
        massage: "Invalid Password",
      });
    }

    return res.status(200).send({
      massage: "Login SuccessFul",
      success: true,
      id: user.id,
    });
  } catch (error) {
    console.log(toString(error).bgBlack.red);
    res.status(500).send({
      massage: "Error in Login Controller",
      success: false,
      error,
    });
  }
};
