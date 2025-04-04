const express = require('express');
const router = express.Router();
const { searchData, getStats } = require('../controllers/searchController');

router.get('/search', searchData);  
router.get('/analytics', getStats);

module.exports = router;
