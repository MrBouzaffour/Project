const nano = require('nano')(process.env.COUCHDB_URL);
const db = nano.db.use(process.env.COUCHDB_DB);

module.exports = async function getDB() {
  return db;
};
