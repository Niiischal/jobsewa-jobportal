const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

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
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            throw new Error("User not found")   
        }

        //comparing password
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if(!validPassword) {
            throw new Error("Invalid Password")
        }

        // create and assign jwt web token
        const token = jwt.sign({ userID: user._id}, process.env.jwt_secret, {expiresIn: '1d'});

        //send response
        res.send({
            success: true,
            message: "User logged in successfully",
            data: token,
          });

    }catch (error) {
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


module.exports = router;
