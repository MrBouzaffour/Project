require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const messageRoutes = require('./routes/messageRoutes');
const replyRoutes = require('./routes/replyRoutes');
const dataRoutes = require('./routes/dataRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload setup
const upload = multer({ dest: path.join(__dirname, 'uploads') });
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/channels', channelRoutes);
app.use('/messages', messageRoutes);   // includes PUT /:id/like & /:id/dislike
app.use('/replies', replyRoutes);      // includes PUT /:id/like & /:id/dislike
app.use('/alldata', dataRoutes);
app.use('/explore', searchRoutes);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));