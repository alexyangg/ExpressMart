import express from "express";
import { login, signup, verify } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/verify", verify);

export default router;
