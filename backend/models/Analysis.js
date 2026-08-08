const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobTitle: {
      type: String,
      default: 'Untitled role',
    },
    jdText: {
      type: String,
      required: true,
    },
    matchScore: {
      type: Number,
      required: true,
    },
    matchedSkills: [String],
    missingSkills: [String],
    experienceGap: String,
    summary: String,
    roadmap: [
      {
        title: String,
        description: String,
        resources: [String],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', analysisSchema);