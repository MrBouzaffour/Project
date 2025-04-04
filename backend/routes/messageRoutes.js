const express = require('express');
const router = express.Router();
const { postMessage, getMessagesByUser, updateMessage, deleteMessage, likeMessage, dislikeMessage } = require('../controllers/messageController');

// Uploading messages
router.post('/', (req, res, next) => req.upload.single('screenshot')(req, res, () => postMessage(req, res)));

// Get messages by user
router.get('/user/:userId', getMessagesByUser);

router.put('/:id/like', likeMessage);
router.put('/:id/dislike', dislikeMessage)

router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

module.exports = router;