import {
  createUser,
  loginUser,
  paymentRazorpay,
  userCredits,
  verifyRazorpayPayment,
} from "../controller/userController.js";
import express from "express";
import { userAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", userAuth, userCredits);
userRouter.post("/pay", userAuth, paymentRazorpay);
userRouter.post("/verify-payment", verifyRazorpayPayment);

export default userRouter;
