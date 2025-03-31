import express from "express";
import dbConnect from "./database/index.js";
import studentRoutes from "./Routes/Student.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // ✅ Fix import

const app = express();
const port = 3000;
const host = "127.0.0.1";

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser()); // ✅ Fix function call

// Routes
app.get("/", (req, res) => {
  res.send("Hi This Is E-learn Backend");
});
app.use("/auth", studentRoutes);

// Database Connection
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`You are running on http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error In Database Connection ", err);
  });
