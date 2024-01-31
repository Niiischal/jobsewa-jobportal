const router = require("express").Router();
const Job = require("../models/jobModel");
const authMiddleware = require("../middlewares/authMiddleware");

// api to add new job
router.post("/add-jobs", authMiddleware, async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.send({
      success: true,
      message: "New job added successfully!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// api to get all the jobs
router.get("/get-jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.send({
      success: true,
      jobs,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/edit-jobs/:id", authMiddleware, async(req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: 'The job has been updated.'
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router;
