import mongoose from "mongoose";
import { isValidEmailFormat } from "@/helpers/validation";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    minlength: [4, "Username should be at least 4 characters long."],
    unique: [true, "That username is occupied, please try another one!"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    validate: {
      validator: isValidEmailFormat,
      message: "Please provide a valid email address!",
    },
    unique: [true, "That email is occupied, please try another one!"],
  },
  password: {
    type: String,
    required: [true, "Please enter password!"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
