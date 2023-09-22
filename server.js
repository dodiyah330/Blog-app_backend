import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

//configure ENV
dotenv.config();

//mongoDB connection
connectDB();

//router import
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

//Initialize Express
const app = express();

//middlewares Initialization
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server Started Successfully".bgCyan.bold);
});
