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
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    secretOTP: {
      type: String,
    },
    pdf: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to add pdf property only for jobSeeker role
userSchema.pre("save", function (next) {
  if (this.role !== "jobSeeker") {
    // If not a jobSeeker, remove the pdf property
    this.pdf = undefined;
  }
  next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
