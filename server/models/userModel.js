const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobSeeker", "jobProvider", "admin"],
      default: "jobSeeker",
    },
    secretOTP: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
