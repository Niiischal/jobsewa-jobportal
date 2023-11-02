const router = require("express").Router();
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");

//user registration api
router.post("/register", async (req, res) => {
  try {
    // checking whether the user already exists
    const user = await User.find({ email: req.body.email });
    if (user) {
      throw new Error("User already exists.");
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(hashedPassword, salt)

    // create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
        success: false,
        message: "User created successfully",
      });

  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
