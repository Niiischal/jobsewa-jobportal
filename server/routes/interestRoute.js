const router = require("express").Router();
const Interest = require("../models/interestModel");
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

router.post("/get-interest", async (req, res) => {
  try {
    const { jobSeeker } = req.body;
    let filters = {};
    if (jobSeeker) {
      filters.jobSeeker = jobSeeker;
    }
    const interests = await Interest.find(filters).populate("jobSeeker");
    res.send({
      success: true,
      data: interests,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/edit-interests/:id", authMiddleware, async (req, res) => {
  try {
    await Interest.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "The interest has been updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/delete-interests/:id", authMiddleware, async (req, res) => {
  try {
    await Interest.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "The interest has been deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all user api
router.get("/get-interests", authMiddleware, async (req, res) => {
  try {
    const interests = await Interest.find();
    res.send({
      success: true,
      message: "Interests retrieved successfully",
      data: interests,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
