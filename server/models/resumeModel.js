const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
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
    contact: {
      type: String,
      required: true,
    },
    links: [
      {
        type: String,
        required: true,
      },
    ],
    about: {
      type: String,
      required: true,
    },
    technicalSkills: [
      {
        type: String,
        required: true,
      },
    ],
    softSkills: [
      {
        type: String,
        required: true,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        startYear: Date,
        endYear: Date,
      },
    ],
    experience: [
      {
        title: String,
        company: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        startDate: Date,
        endDate: Date,
        link: String,
      },
    ],
    certificates: [
      {
        title: String,
        organization: String,
        date: Date,
        link: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
