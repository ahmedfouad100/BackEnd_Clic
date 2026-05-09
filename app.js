const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routers/user.routes");
const categoryRouter = require("./routers/category.routes");
const productRouter = require("./routers/product.routes");
const { errorhandler } = require("./middlewares/Error.middleware");

const app = express();

// Database connection
async function DB_connection() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}
DB_connection();

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Logging (console only)
app.use(morgan("dev"));

// API routes
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);

// Serve uploaded files
app.use('/uploads', express.static('uploads'));
// app.use('/assets', express.static('assets'));

// Health check
// app.get("/api/health", (req, res) => {
//   res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
// });

// Global error handler
app.use(errorhandler);

module.exports = app;
