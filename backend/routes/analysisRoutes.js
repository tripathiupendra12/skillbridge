const express = require('express');
const router = express.Router();
const { runAnalysis } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.post('/run', protect, runAnalysis);

module.exports = router;