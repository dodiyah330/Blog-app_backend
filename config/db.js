import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected".bgBlack.green);
  } catch (error) {
    console.log(error);
    console.log("Error connecting Database".bgBlack.red);
  }
};

export default connectDB;
