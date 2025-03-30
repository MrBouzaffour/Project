const express = require('express');
const router = express.Router();
const { postReply } = require('../controllers/replyController');

router.post('/', (req, res, next) => req.upload.single('screenshot')(req, res, () => postReply(req, res)));

module.exports = router;
