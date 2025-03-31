const { searchContent, getAnalytics } = require('../models/searchModel');

exports.searchData = async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query string is required.' });

  try {
    const results = await searchContent(query);
    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Search failed.' });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await getAnalytics();
    res.json(stats);
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
};
