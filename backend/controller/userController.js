import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if ((!name, !email, !password)) {
      return res.json({ message: "Missing details" });
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
      token,
    });
  } catch (error) {
    console.log("error");
    res.json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.json({ message: "Missing details" });
    }
    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res.json({
        message: "User dose not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    console.log("error");
    res.json({ message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user) {
      return res.json({
        credits: user.creditBalance,
        user: { name: user.name },
      });
    }
  } catch (error) {
    console.log("error");
    res.json({ message: error.message });
  }
};
