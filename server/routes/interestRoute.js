const router = require("express").Router()
const Interest = require("../models/interestModel")
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/post-interests", authMiddleware, async (req, res) => {
    try {
      const newInterest = new Interest(req.body);
      await newInterest.save();
      res.send({
        success: true,
        message: "New interest added successfully!",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports = router;