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
    verificationToken: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
    },
    secretOTP: {
      type: String,
    },
    pdf: {
      type: [String],
      default: [],
    },
    savedJobs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs'
    }],
    appliedJobs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jobs'
    }]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
    if (this.role !== "jobSeeker") {
      // If not a jobSeeker, remove these properties
      this.pdf = undefined;
      this.savedJobs = undefined;
      this.appliedJobs = undefined;
    }
    next();
  });
  

const User = mongoose.model("users", userSchema);

module.exports = User;