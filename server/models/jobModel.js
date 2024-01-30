const mongoose = require("mongoose");
const jobsSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        companyEmail: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        openings: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        jobLevel: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        salaryPeriod: {
            type: String,
            required: true,
        },
        salaryAmount: {
            type: String,
            required: true,
        },
        skills: {
            type: Array,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        specification: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Job = mongoose.model("jobs", jobsSchema);

module.exports = Job;