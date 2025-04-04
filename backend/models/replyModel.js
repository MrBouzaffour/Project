const getDB = require('./couch');

exports.insertReply = async ({ parentId, data, screenshot, userId, username }) => {
  const db = await getDB();
  const doc = {
    type: 'reply',
    parentId,
    data,
    screenshot,
    userId,
    username,
    likes: 0,
    dislikes: 0,
    userVotes: {},
    timestamp: new Date().toISOString(),
  };
  return db.insert(doc);
};