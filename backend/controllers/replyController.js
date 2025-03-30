const { insertReply } = require('../models/replyModel');

exports.postReply = async (req, res) => {
  try {
    const { parentId, data } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await insertReply({ parentId, data, screenshot });
    res.json(result);
  } catch (err) {
    console.error('Error posting reply:', err);
    res.status(500).json({ error: 'Failed to post reply' });
  }
};