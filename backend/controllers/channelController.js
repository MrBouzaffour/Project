const { fetchAllChannels, insertChannel } = require('../models/channelModel');

exports.getAllChannels = async (req, res) => {
  try {
    const channels = await fetchAllChannels();
    res.json(channels);
  } catch (err) {
    console.error('Error fetching channels:', err);
    res.status(500).json({ error: 'Failed to get channels' });
  }
};

exports.createChannel = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const newChannel = await insertChannel(name);
    res.status(201).json(newChannel);
  } catch (err) {
    console.error('Error creating channel:', err);
    res.status(500).json({ error: 'Failed to create channel' });
  }
};
