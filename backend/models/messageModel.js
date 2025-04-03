const getDB = require('./couch');

exports.insertMessage = async ({ channelId, topic, data, screenshot, userId, username }) => {
  const db = await getDB();
  const doc = {
    type: 'message',
    channelId,
    topic,
    data,
    screenshot,
    timestamp: new Date().toISOString(),
    userId,
    username,
  };
  return db.insert(doc);
};

exports.fetchMessagesByUserId = async (userId) => {
  const db = await getDB();
  const result = await db.find({ selector: { type: 'message', userId } });
  return result.docs;
};
