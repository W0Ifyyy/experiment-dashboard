import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username!"],
    unique: [true, "That username is occupied, please try another one!"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
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
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
