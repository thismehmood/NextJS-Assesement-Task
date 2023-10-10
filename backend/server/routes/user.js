import express from "express";
// controllers
import VerifyToken from "../utils/Jwt.js";
import user from "../controllers/user.js";
import upload from "../utils/upload.js";
const router = express.Router();

router.post("/register", user.onCreateUser).post("/login", user.onLoginUser);

router.post(
  "/document",
  VerifyToken,
  upload.array("images", 10),
  user.onCreateDocument
);
export default router;
