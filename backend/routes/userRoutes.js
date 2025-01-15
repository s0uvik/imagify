import { createUser, loginUser } from "../controller/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

export default userRouter;
