const getDB = require('../models/couch');
const { insertMessage, fetchMessagesByUserId, likeMessage, dislikeMessage } = require('../models/messageModel');

exports.postMessage = async (req, res) => {
  try {
    const { channelId, topic, data, userId, username } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;
    const result = await insertMessage({ channelId, topic, data, screenshot, userId, username });
    res.json(result);
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ error: 'Failed to post message' });
  }
};

exports.getMessagesByUser = async (req, res) => {
  try {
    const messages = await fetchMessagesByUserId(req.params.userId);
    res.json(messages);
  } catch (err) {
    console.error('Error getting user messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;
    const { data } = req.body;

    const doc = await db.get(id);
    doc.data = data;
    const response = await db.insert(doc);
    res.json(response);
  } catch (err) {
    console.error('Error updating message:', err);
    res.status(500).json({ error: 'Failed to update message' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const db = await getDB();
    const { id } = req.params;

    const doc = await db.get(id);
    const response = await db.destroy(doc._id, doc._rev);
    res.json(response);
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};
exports.likeMessage = async (req, res) => {
  try {
    const result = await likeMessage(req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Error liking message:', err);
    res.status(500).json({ error: 'Failed to like message' });
  }
};

exports.dislikeMessage = async (req, res) => {
  try {
    const result = await dislikeMessage(req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Error disliking message:', err);
    res.status(500).json({ error: 'Failed to dislike message' });
  }
};
