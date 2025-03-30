const getDB = require('./couch');

exports.insertMessage = async ({ channelId, topic, data, screenshot }) => {
  const db = await getDB();
  const doc = {
    type: 'message',
    channelId,
    topic,
    data,
    screenshot,
    timestamp: new Date().toISOString(),
  };
  return db.insert(doc);
};