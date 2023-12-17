import express from "express";
import {getUsers, loginUser, registerUser} from "../controllers/authController.js";
const router = express.Router();

router.get("/users", getUsers);
router.post("/users", registerUser);
router.post("/users/login", loginUser);

export default router;