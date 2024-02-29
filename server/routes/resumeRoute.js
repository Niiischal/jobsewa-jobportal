const router = require("express").Router();
const Resume = require("../models/resumeModel")
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/generate-resume", authMiddleware, async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.send({
      success: true,
      message: "Resume Generated Successfully!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;