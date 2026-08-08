const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");
const {
  extractResumeData,
  extractJDData,
} = require("../services/aiExtractionService");
const { runGapAnalysis } = require("../services/gapAnalysisService");
const { generateRoadmap } = require('../services/roadmapService');

const runAnalysis = async (req, res) => {
  try {
    const { resumeId, jdText } = req.body;

    if (!resumeId || !jdText) {
      return res
        .status(400)
        .json({ message: "resumeId and jdText are required" });
    }

    const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found " });
    }

    const resumeData = await extractResumeData(resume.extractedText);
    const jdData = await extractJDData(jdText);

    const gapResult = await runGapAnalysis(resumeData, jdData);

    const roadmapResult = await generateRoadmap(gapResult.missingSkills);

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobTitle: jdData.roleTitle || "Untitled role",
      jdText,
      matchScore: gapResult.matchScore,
      matchedSkills: gapResult.matchedSkills,
      missingSkills: gapResult.missingSkills,
      experienceGap: gapResult.experienceGap,
      summary: gapResult.summary,
      roadmap: roadmapResult.roadmap,
    });
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { runAnalysis, getHistory };
