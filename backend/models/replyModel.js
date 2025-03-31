const getDB = require('./couch');

exports.insertReply = async ({ parentId, data, screenshot }) => {
    const db = await getDB();
    const doc = {
      type: 'reply',
      parentId,
      data,
      screenshot,
      timestamp: new Date().toISOString(),
    };
    return db.insert(doc);
  };