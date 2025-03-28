const getDB = require('./couch');

exports.insertChannel = async (name) => {
  const db = await getDB();
  const doc = { type: 'channel', name };
  return db.insert(doc);
};

exports.getAllChannels = async () => {
  const db = await getDB();
  const result = await db.find({ selector: { type: 'channel' } });
  return result.docs;
};