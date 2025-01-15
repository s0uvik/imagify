import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
await connectDB();

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(PORT, () => {
  console.log("app is running...");
});
