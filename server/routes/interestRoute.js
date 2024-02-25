const router = require("express").Router()
const Interest = require("../models/interestModel")

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