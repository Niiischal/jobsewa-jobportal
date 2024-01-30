const router = require('express').Router();
const Job = require("../models/jobModel")
const authMiddleware = require("../middlewares/authMiddleware")

// api to add new job
router.post("/add-job", authMiddleware, async(req, res)=> {
    try {
        const newJob = new Job(req.body)
        res.send({
            success: true,
            message:  "New job added successfully!",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        }
        )
    }
})