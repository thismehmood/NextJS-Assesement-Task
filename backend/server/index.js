import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// MongoDB connection
import "./config/mongo.js";

// Routes
import userRouter from "./routes/user.js";

// Middlewares
const app = express();

// Get port from environment and store in Express
const port = process.env.PORT || "4000";
app.set("port", port);

// Use middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// Define routes
app.use("/user", userRouter);
app.use("/user/data", userRouter);

// Catch 404 and forward to error handler
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesn't exist",
  });
});

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);

// Event listener for HTTP server "listening" event
server.on("listening", () => {
  console.log(`Listening on port: http://localhost:${port}/`);
});
