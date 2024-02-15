const router = require("express").Router();
const Job = require("../models/jobModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/userModel");

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
router.post("/get-jobs", async (req, res) => {
  try {
    const {
      jobProvider,
      level = [],
      type = [],
      category = [],
      status,
    } = req.body;
    let filters = {};
    if (jobProvider) {
      filters.jobProvider = jobProvider;
    }
    if (status) {
      filters.status = status;
    }

    // filter by category
    if (category.length > 0) {
      filters.category = { $in: category };
    }

    // filter by job level
    if (level.length > 0) {
      filters.level = { $in: level };
    }

    // filter by job level
    if (type.length > 0) {
      filters.type = { $in: type };
    }

    const jobs = await Job.find(filters)
      .populate("jobProvider")
      .sort({ createdAt: 1 });
    res.send({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-job-by-id/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("jobProvider");
    res.send({
      success: true,
      data: job,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/save-job-by-id/:id", authMiddleware, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.body.userId;


    const user = await User.findById(userId).populate("savedJobs");

    // Checking whether the job is already saved by the user
    if (user.savedJobs.some((savedJob) => savedJob._id.toString() === jobId)) {
      return res.status(400).send({
        success: false,
        message: "Job already saved by the user",
      });
    }

    // Adding the job ID to the user's savedJobs field
    user.savedJobs.push(jobId);
    await user.save();

    res.send({
      success: true,
      message: "Job saved successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-saved-jobs/:id", authMiddleware, async (req, res) => {
  try {
    const savedJob = await User.findById(req.body.userId).populate("savedJobs");
    res.send({
      success: true,
      data: savedJob,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/edit-jobs/:id", authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "The job has been updated.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// api to delete a job
router.delete("/delete-jobs/:id", authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "The job has been deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// api to update job status
router.put("/update-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await Job.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Job  Status Updated Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
