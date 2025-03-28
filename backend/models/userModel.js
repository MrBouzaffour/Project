const bcrypt = require('bcryptjs');
const getDB = require('./couch');

const dbName = 'channeltool';

exports.createUser = async (name, email, password) => {
  const db = await getDB();
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    _id: `user:${email}`,
    type: 'user',
    name,
    email,
    password: hashed,
  };
  return db.insert(user);
};

exports.findUserByEmail = async (email) => {
  const db = await getDB();
  try {
    const doc = await db.get(`user:${email}`);
    return doc;
  } catch (err) {
    return null;
  }
};