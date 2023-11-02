const router = require("express").Router();
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken")

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
        const token = jwt.sign({ userID: user._id}, process.env.JWT_SECRET_TOKEN, {expiresIn: '7d'});

        //send response
        res.send({
            success: false,
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

module.exports = router;