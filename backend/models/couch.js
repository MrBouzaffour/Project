const nano = require('nano')(process.env.COUCHDB_URL);
const dbName = 'channeltool';

const getDB = async () => {
  const dbList = await nano.db.list();
  if (!dbList.includes(dbName)) {
    await nano.db.create(dbName);
    console.log(`Created CouchDB database: ${dbName}`);
  } else {
    console.log(`Connected to CouchDB database: ${dbName}`);
  }
  return nano.db.use(dbName);
};

module.exports = getDB;