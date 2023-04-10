import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/User-routes";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use("/user", userRouter);

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://Admin:${process.env.MONGODB_PASSWORD}@cluster0.vacsgfh.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(5000, () => {
      console.log("connected to Database And server is running");
    })
  )
  .catch((e) => console.log(e));
