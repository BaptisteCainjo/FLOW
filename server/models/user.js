import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  confirm_password: String,
  accept_terms: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
