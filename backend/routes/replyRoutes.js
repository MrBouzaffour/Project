const express = require('express');
const router = express.Router();
const {
  postReply,
  likeReply,
  dislikeReply,
} = require('../controllers/replyController');

router.post('/', (req, res, next) => req.upload.single('screenshot')(req, res, () => postReply(req, res)));
router.put('/:id/like', likeReply);
router.put('/:id/dislike', dislikeReply);

module.exports = router;