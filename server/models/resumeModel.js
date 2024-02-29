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
        degree: {
          type: String,
          required: true,
        },
        institution: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          required: true,
        },
        endYear: {
          type: Number,
        },
      },
    ],
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
        },
        link: {
          type: String,
        },
      },
    ],
    certificates: [
      {
        title: {
          type: String,
          required: true,
        },
        organization: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        link: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
