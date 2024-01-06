const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require("nodemailer");

//user registration api
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Extract the role from the request body, default to "user" if not provided
    const roles = req.body.roles ? [req.body.roles] : ["user"];

    // Create a new user with the role information
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      roles: roles,
    });

    // Save the new user to the database
    await newUser.save();

    res.send({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//user login api
router.post("/login", async (req, res) => {
  try {
    // checking if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    //comparing password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid Password");
    }

    // create and assign jwt web token
    const token = jwt.sign({ userID: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    //send response
    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user api
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//forgot password api
router.post("/forgot-password", async (req, res) => {
  try {
    // checking whether the user exists or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("No account found with this email address");
    }

    //Function for generating a random OTP
    function generateOTP(length) {
      const values = "0123456789";
      let otp = "";
      for (let i = 0; i < length; i++) {
        otp += values[Math.floor(Math.random() * 10)];
      }
      return otp;
    }

    // Unique OTP generation if the user doesn't have one
    if (!user.secretOTP) {
      const otp = generateOTP(6);

    //saving the secretOTP in the database
    user.secretOTP = otp;
    await user.save();
    }

    //get otp from the user document
    const otp = user.secretOTP;

    // sending otp in the email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jobsewanp@gmail.com",
        pass: "zowv hopz ugmd dtgq",
      },
    });

    const mailOptions = {
      from: "jobsewanp@gmail.com",
      to: user.email,
      subject: "OTP to reset your password",
      html: `
      <p>Hi ${user.name},</p>
      <p>We received a request to reset your password. To reset your password, use this OTP: <strong>${otp}</strong></p>
      <p>Thank you!<br>JobSewa Support Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.send(
      {
        success: true,
        message: "OTP sent in your email",
      }
    )
  } catch (error) {
    res.send(
      {
        success: false,
        message: error.message,
      }
    )
  }
});

// OTP verification and password update api
router.post("/verification-OTP", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    // Verify the OTP
    if (user.secretOTP !== otp) {
      throw new Error("Invalid OTP");
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear the OTP-related fields
    user.secretOTP = null;

    // Save the updated user
    await user.save();

    // Send a success response
    res.send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    // Send an error response
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
