const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const channelRoutes = require('./routes/channelRoutes');
const getDB = require('./models/couch');
const dbName = 'channeltool';
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use('/channels', channelRoutes);

app.post('/messages', upload.single('screenshot'), async (req, res) => {
  const { channelId, topic, data } = req.body;
  const screenshot = req.file ? `/uploads/${req.file.filename}` : null;
  const db = await getDB();
  const doc = { type: 'message', channelId, topic, data, screenshot, timestamp: new Date().toISOString() };
  const result = await db.insert(doc);
  res.json(result);
});

app.post('/replies', upload.single('screenshot'), async (req, res) => {
  const { parentId, data } = req.body;
  const screenshot = req.file ? `/uploads/${req.file.filename}` : null;
  const db = await getDB();
  const doc = { type: 'reply', parentId, data, screenshot, timestamp: new Date().toISOString() };
  const result = await db.insert(doc);
  res.json(result);
});

app.get('/alldata', async (req, res) => {
  const db = await getDB();
  const result = await db.list({ include_docs: true });
  const docs = result.rows.map(r => r.doc);
  res.json({
    channels: docs.filter(d => d.type === 'channel'),
    messages: docs.filter(d => d.type === 'message'),
    replies: docs.filter(d => d.type === 'reply'),
  });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));