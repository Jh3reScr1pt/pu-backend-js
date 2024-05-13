import express from "express";
import {
  listUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/list", listUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
