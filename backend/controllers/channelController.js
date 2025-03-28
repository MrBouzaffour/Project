const channelModel = require('../models/channelModel');

exports.createChannel = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await channelModel.insertChannel(name);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllChannels = async (req, res) => {
  try {
    const channels = await channelModel.getAllChannels();
    res.json(channels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};