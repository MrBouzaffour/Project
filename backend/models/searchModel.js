const getDB = require('./couch');

exports.searchContent = async (query) => {
  const db = await getDB();
  const searchRegex = new RegExp(query, 'i');

  const allDocs = await db.list({ include_docs: true });

  const messages = allDocs.rows
    .filter(row => row.doc.type === 'message' &&
      (searchRegex.test(row.doc.topic) || searchRegex.test(row.doc.data)))
    .map(row => row.doc);

  const replies = allDocs.rows
    .filter(row => row.doc.type === 'reply' &&
      searchRegex.test(row.doc.data))
    .map(row => row.doc);

  return { messages, replies };
};

exports.getAnalytics = async () => {
  const db = await getDB();
  const allDocs = await db.list({ include_docs: true });

  const userStats = {};
  allDocs.rows.forEach(row => {
    const doc = row.doc;
    if (!doc.userId) return;

    if (!userStats[doc.userId]) {
      userStats[doc.userId] = { posts: 0, replies: 0 };
    }

    if (doc.type === 'message') {
      userStats[doc.userId].posts += 1;
    } else if (doc.type === 'reply') {
      userStats[doc.userId].replies += 1;
    }
  });

  return userStats;
};
