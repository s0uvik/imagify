import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.json({ success: false, message: "Missing details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "User created",
      user: { name: user.name },
      token,
    });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.json({ success: false, message: "Missing details" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User dose not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "Login successfully",
      user: { name: user.name },
      token,
    });
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user) {
      return res.json({
        success: true,
        credits: user.creditBalance,
        user: { name: user.name },
      });
    }
  } catch (error) {
    console.log("error");
    res.json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const user = await userModel.findById(userId);
    if (!user || !planId) {
      return res.json({
        success: false,
        message: "Missing details",
      });
    }
    let credits, plan, amount, date;

    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({
          success: false,
          message: "Plan not found",
        });
    }
    date = Date.now();

    const transactionDate = {
      userId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionDate);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({
          success: false,
          message: error,
        });
      }

      res.json({
        success: true,
        order,
      });
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionDate = await transactionModel.findById(
        orderInfo.receipt
      );
      if (transactionDate.payment) {
        return res.json({
          success: false,
          message: "Payment failed",
        });
      } else {
        const userData = await userModel.findById(transactionDate.userId);
        const creditBalance = userData.creditBalance + transactionDate.credits;

        await userModel.findByIdAndUpdate(userData._id, { creditBalance });

        await transactionModel.findByIdAndUpdate(transactionDate._id, {
          payment: true,
        });

        res.json({
          success: true,
          message: "Credits added",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
