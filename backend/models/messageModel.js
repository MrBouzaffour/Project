const getDB = require('./couch');

exports.insertMessage = async ({ channelId, topic, data, screenshot, userId, username }) => {
  const db = await getDB();
  const doc = {
    type: 'message',
    channelId,
    topic,
    data,
    screenshot,
    userId,
    username,
    likes: 0,
    dislikes: 0,
    timestamp: new Date().toISOString(),
  };
  return db.insert(doc);
};

exports.fetchMessagesByUserId = async (userId) => {
  const db = await getDB();
  const result = await db.find({ selector: { type: 'message', userId } });
  return result.docs;
};
exports.likeMessage = async (id) => {
  const db = await getDB();
  const doc = await db.get(id);
  doc.likes = (doc.likes || 0) + 1;
  return db.insert(doc);
};

exports.dislikeMessage = async (id) => {
  const db = await getDB();
  const doc = await db.get(id);
  doc.dislikes = (doc.dislikes || 0) + 1;
  return db.insert(doc);
};