const express = require('express');
const router = express.Router();
const { searchData, getStats } = require('../controllers/searchController');

router.get('/search', searchData);  // ✅ Ensure searchData is defined
router.get('/analytics', getStats); // ✅ Ensure getStats is defined

module.exports = router;
