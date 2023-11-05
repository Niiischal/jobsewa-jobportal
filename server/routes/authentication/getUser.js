const router = require("express").Router();
const authMiddleware = require("../../middlewares/authMiddleware");
const User = require("../../models/userModel");

// get current user api
router.post("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        res.send({
            success: true,
            message: "User retrieved successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
})
module.exports = router;
