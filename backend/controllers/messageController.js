const { insertMessage } = require('../models/messageModel');

exports.postMessage = async (req, res) => {
  try {
    const { channelId, topic, data } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await insertMessage({ channelId, topic, data, screenshot });
    res.json(result);
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ error: 'Failed to post message' });
  }
};