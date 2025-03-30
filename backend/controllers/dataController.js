const { getAllDocs } = require('../models/dataModel');

exports.getAllData = async (req, res) => {
  try {
    const docs = await getAllDocs();
    res.json({
      channels: docs.filter((d) => d.type === 'channel'),
      messages: docs.filter((d) => d.type === 'message'),
      replies: docs.filter((d) => d.type === 'reply'),
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to load data' });
  }
};