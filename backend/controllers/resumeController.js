const fs = require('fs');
const Resume = require('../models/Resume');
const extractTextFromPDF = require('../services/pdfParserService');

const uploadResume = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "No file uploaded"});
        }

        const filePath = req.file.path;

        const extractedText = await extractTextFromPDF(filePath);

        const resume = await Resume.create({
            user: req.user._id,
            fileName: req.file.originalname,
            extractedText,
        });

        fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete temp file:', err);
    });

        res.status(201).json({
      _id: resume._id,
      fileName: resume.fileName,
      message: 'Resume uploaded and parsed successfully',
    });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {uploadResume};