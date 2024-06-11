import express from "express";
import {
  listUser,
  loginUser,
  registerUser,
  getUserId,
} from "../controllers/userController.js";
import authMiddleware from '../middleware/auth.js';
const userRouter = express.Router();

userRouter.get("/list", listUser);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/getUserId", authMiddleware,getUserId); 

export default userRouter;
