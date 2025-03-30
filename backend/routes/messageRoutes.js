const express = require('express');
const router = express.Router();
const { postMessage } = require('../controllers/messageController');

router.post('/', (req, res, next) => req.upload.single('screenshot')(req, res, () => postMessage(req, res)));

module.exports = router;