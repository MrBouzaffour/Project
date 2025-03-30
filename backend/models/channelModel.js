const getDB = require('./couch');

exports.fetchAllChannels = async () => {
  const db = await getDB();
  const result = await db.find({ selector: { type: 'channel' } });
  return result.docs;
};

exports.insertChannel = async (name) => {
  const db = await getDB();
  const doc = {
    _id: `channel:${Date.now()}`, 
    type: 'channel',
    name,
    createdAt: new Date().toISOString(),
  };
  const response = await db.insert(doc);
  return { ...doc, _id: response.id, _rev: response.rev };
};
