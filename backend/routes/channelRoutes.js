const express = require('express');
const router = express.Router();
const {
  getAllChannels,
  createChannel,
} = require('../controllers/channelController'); 

router.get('/', getAllChannels); 
router.post('/', createChannel);

module.exports = router;
