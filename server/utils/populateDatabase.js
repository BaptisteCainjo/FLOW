import User from "../models/user.js";
import bcrypt from "bcrypt";
import { saltRounds } from "./config.js";

const populateUsers = async () => {
  const hashedPassword = await bcrypt.hash("test", saltRounds);
  const hashedConfirmPassword = await bcrypt.hash("test", saltRounds);
  const userData = {
    name: "Baptiste",
    email: "cainjo.baptiste@orange.fr",
    password: hashedPassword,
    confirm_password: hashedConfirmPassword,
    accept_terms: true,
  };

  const existingUser = await User.findOne({ email: userData.email });
  if (!existingUser) {
    const newUser = await User.create(userData);
    console.log(`Utilisateur ${newUser.name} enregistré avec succès !`);
  } else {
    console.log(
      `L'utilisateur avec l'email ${userData.email} existe déjà dans la base de données.`
    );
  }
};

export default populateUsers;