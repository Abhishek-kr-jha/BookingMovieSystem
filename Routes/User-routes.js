import express from "express";
import {
  deleteuser,
  getAllUsers,
  login,
  singup,
  updateUser,
} from "../Contrrollers/User-conrtroller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", singup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteuser);
userRouter.post("/login", login);

export default userRouter;
