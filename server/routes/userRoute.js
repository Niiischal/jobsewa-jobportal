const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require("nodemailer");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const crypto = require("crypto");

const createAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ email: "admin@jobsewanp.com" });

    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        process.env.admin_password,
        salt
      );

      const newAdmin = new User({
        name: "Admin",
        email: "admin@jobsewanp.com",
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

// Call the function to create the admin user when this route file is imported
createAdminUser();

//user registration api
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists.");
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Generating a unique verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");

    const roles = req.body.roles ? [req.body.roles] : ["jobSeeker"];

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      roles: roles,
      verificationToken: verificationToken,
      isEmailVerified: false,
    });

    // Save the new user to the database
    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jobsewanp@gmail.com",
        pass: "zowv hopz ugmd dtgq",
      },
    });

    const mailOptions = {
      from: "jobsewanp@gmail.com",
      to: newUser.email,
      subject: "Email Verification",
      html: `<p>Please click the following link to verify your email address: <a href="http://localhost:3000/verify/${verificationToken}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.send({
      success: true,
      message:
        "User created successfully. Please check your email for verification.",
      token: verificationToken,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Verification route
router.get("/verify/:token", async (req, res) => {
  try {
    const verificationToken = req.params.token;
    console.log(verificationToken);

    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new Error("Invalid verification token");
    }

    user.isEmailVerified = true;
    user.status = "active";
    user.verificationToken = undefined;

    await user.save();

    res.send("Email verified successfully. You can now log in.");
  } catch (error) {
    res.status(400).send("Error verifying email: " + error.message);
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

    // // Checking if user's email is verified
    if (!user.isEmailVerified) {
      throw new Error("Email not verified");
    }

    // Blocking the user from login while the user status is not active
    if (user.status !== "active") {
      throw new Error(" The account have been blocked, contact the admin");
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
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.send({
        success: false,
        message: "User not found",
      });
    }

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

// get all user api
router.get("/get-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// user status update api
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "User status updated successfully",
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

    function generateOTP(length) {
      const values = "0123456789";
      let otp = "";
      for (let i = 0; i < length; i++) {
        otp += values[Math.floor(Math.random() * 10)];
      }
      return otp;
    }

    if (!user.secretOTP) {
      const otp = generateOTP(6);

      //saving the secretOTP in the database
      user.secretOTP = otp;
      await user.save();
    }

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

    res.send({
      success: true,
      message: "OTP sent in your email",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
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

    if (user.secretOTP !== otp) {
      throw new Error("Invalid OTP");
    }

    // Updating the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.secretOTP = null;

    await user.save();

    res.send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// retrieving file from the system
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/resume-upload",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      if (req.file.mimetype !== "application/pdf") {
        throw new Error("Invalid file format. Please upload a PDF document.");
      }

      // Uploading file to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "JobSewa",
        resource_type: "raw",
      });

      const userId = req.body.userId;
      await User.findByIdAndUpdate(userId, {
        $push: { pdf: result.secure_url },
      });

      res.send({
        success: true,
        message: "File upload successful",
        result,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

// Update user information
router.put("/update-user/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.send({
        success: false,
        message: "Name, email, and password are required fields",
      });
    }

    // Updating user information in the database with the hashed password
    await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
    });

    res.send({
      success: true,
      message: "User information updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//change password api
router.put("/change-password/:id", authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.send({
        success: false,
        message: "password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Updating user information in the database with the hashed password
    await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
    });

    res.send({
      success: true,
      message: "User information updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
