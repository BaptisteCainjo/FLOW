import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  writeEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/", checkAuthenticated, async (req, res) =>
  res.render("index.ejs", { name: req.user.name })
);

router.get("/login", checkNotAuthenticated, (req, res) =>
  res.render("login.ejs")
);

router.get("/register", checkNotAuthenticated, (req, res) =>
  res.render("register.ejs")
);

router.post("/login", checkNotAuthenticated, loginUser);

router.post("/register", checkNotAuthenticated, registerUser);

router.get("/verified", writeEmail)



router.post("/logout", logoutUser);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

export default router;
