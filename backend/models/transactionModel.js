import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  plan: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  credits: {
    type: Number,
    require: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Number,
  },
});

const transactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);
export default transactionModel;
