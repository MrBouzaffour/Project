const getDB = require('../models/couch');
const { insertMessage, fetchMessagesByUserId, likeMessage, dislikeMessage } = require('../models/messageModel');

exports.postMessage = async (req, res) => {
  try {
    const { channelId, topic, data, userId, username } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await insertMessage({
      channelId,
      topic,
      data,
      screenshot,
      userId,
      username
    });

    res.json(result);
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ error: 'Failed to post message' });
  }
};

exports.getMessagesByUser = async (req, res) => {
  try {
    console.log('Getting posts for user:', req.params.userId);
    const messages = await fetchMessagesByUserId(req.params.userId);
    console.log('Returned messages:', messages);
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
    const db = await getDB();
    const doc = await db.get(req.params.id);
    const { userId } = req.body;

    if (!doc.userVotes) doc.userVotes = {};
    if (doc.userVotes[userId]) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    doc.userVotes[userId] = 'like';
    doc.likes = (doc.likes || 0) + 1;

    const result = await db.insert(doc);
    res.json(result);
  } catch (err) {
    console.error('Error liking message:', err);
    res.status(500).json({ error: 'Failed to like message' });
  }
};

exports.dislikeMessage = async (req, res) => {
  try {
    const db = await getDB();
    const doc = await db.get(req.params.id);
    const { userId } = req.body;

    if (!doc.userVotes) doc.userVotes = {};
    if (doc.userVotes[userId]) {
      return res.status(400).json({ error: 'User has already voted' });
    }

    doc.userVotes[userId] = 'dislike';
    doc.dislikes = (doc.dislikes || 0) + 1;

    const result = await db.insert(doc);
    res.json(result);
  } catch (err) {
    console.error('Error disliking message:', err);
    res.status(500).json({ error: 'Failed to dislike message' });
  }
};