const mongoose = require("mongoose");
const interestSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        education: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        experience: {
            type: String,
            required: true,
        },
        skills: {
            type: Array,
            required: true,
        },
        jobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Interest = mongoose.model("interests", interestSchema);

module.exports = Interest;