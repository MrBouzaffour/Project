const { insertReply, likeReply, dislikeReply } = require('../models/replyModel');
const getDB = require('../models/couch');

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

exports.likeReply = async (req, res) => {
  try {
    const result = await likeReply(req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Error liking reply:', err);
    res.status(500).json({ error: 'Failed to like reply' });
  }
};

exports.dislikeReply = async (req, res) => {
  try {
    const result = await dislikeReply(req.params.id);
    res.json(result);
  } catch (err) {
    console.error('Error disliking reply:', err);
    res.status(500).json({ error: 'Failed to dislike reply' });
  }
};

exports.insertReply = async ({ parentId, data, screenshot }) => {
  const db = await getDB();
  const doc = {
    type: 'reply',
    parentId,
    data,
    screenshot,
    likes: 0,
    dislikes: 0,
    timestamp: new Date().toISOString(),
  };
  return db.insert(doc);
};

exports.likeReply = async (id) => {
  const db = await getDB();
  const doc = await db.get(id);
  doc.likes = (doc.likes || 0) + 1;
  return db.insert(doc);
};

exports.dislikeReply = async (id) => {
  const db = await getDB();
  const doc = await db.get(id);
  doc.dislikes = (doc.dislikes || 0) + 1;
  return db.insert(doc);
};
