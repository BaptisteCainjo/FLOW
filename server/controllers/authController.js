import bcrypt from "bcrypt";
import passport from "passport";
import User from "../models/user.js";
import { initPassport } from "../config/passport-config.js";
import { saltRounds } from "../utils/config.js";
import sendEmail from "../config/nodemailer-config.js";

initPassport(
  passport,
  async (email) => await User.findOne({ email: email }),
  async (id) => await User.findOne({ id: id })
);

export async function loginUser(req, res, next) {
  // passport.authenticate("local", {
  //   successRedirect: "/",
  //   failureRedirect: "/login",
  //   failureFlash: true,
  // })(req, res, next);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (email === "" || password === "") {
      return res.status(400).json({ message: "Les informations ne sont pas complètes." });
    }
    else if (!user ||  !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Adresse e-mail ou mot de passe incorrect." });
    }else{
      return res.status(200).json({ message: "Connexion réussie" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erreur lors de la connexion." });
  }
}

export async function registerUser(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const hashedConfirmPassword = await bcrypt.hash(
      req.body.confirm_password,
      saltRounds
    );

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      confirm_password: hashedConfirmPassword,
      accept_terms: req.body.accept_terms,
    });

    await user.save();
    console.log(
      `Utilisateur ${user.name} avec l'adresse ${user.email} a été enregistré avec succès !`
    );
    res.redirect("/login");
  } catch (e) {
    res.redirect("/register");
    console.log("Erreur lors de l'enregistrement de l'utilisateur.", e);
  }
}

export async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({
      message: "Erreur lors de la recherche des utilisateurs.",
    });
  }
}

export async function writeEmail(req, res) {
  try {
    const { name, email, password, confirm_password, accept_terms, secretKey } =
      req.query;
    const result = await sendEmail(
      email,
      `🔥 Bienvenue sur Flow ${name} !`,
      `Bienvenue sur Flow ${name} ! Votre compte a bien été créé ! Votre mot de passe est : ${password} A bientôt sur Flow ! L'équipe Flow`,
      `<h1>Bienvenue sur Flow ${name} !</h1> <br> <p>Votre compte a bien été créé ! <br> Voici votre code pour valider votre compte : ${secretKey} <br> A bientôt sur Flow ! <br> <br> L'équipe Flow</p> `
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
}

export function logoutUser(req, res, next) {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}
