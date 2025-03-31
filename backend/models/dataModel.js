const getDB = require('./couch');
exports.getAllDocs = async () => {
    const db = await getDB();
    const result = await db.list({ include_docs: true });
    return result.rows.map((r) => r.doc);
  };