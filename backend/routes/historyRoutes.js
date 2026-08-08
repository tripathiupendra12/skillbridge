const express = require('express');
const router = express.Router();
const { getHistory } = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getHistory);

module.exports = router;