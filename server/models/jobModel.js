const mongoose = require("mongoose");
const jobsSchema = new mongoose.Schema(
    {
        companyname: {
            type: String,
            required: true,
        },
        companyemail: {
            type: String,
            required: true,
        },
        companylocation: {
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
        level: {
            type: String,
            required: true,
        },
        type: {
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
        salaryperiod: {
            type: String,
            required: true,
        },
        salaryamount: {
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
        jobProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        status: {
            type: String,
            default: "pending",
            required: true,
        },
        appliedCandidates:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }]
    },
    {
        timestamps: true,
    }
)

const Job = mongoose.model("jobs", jobsSchema);

module.exports = Job;