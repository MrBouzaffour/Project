require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/authRoutes');


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
//app.use('/channels', require('./routes/channelRoutes'));
//app.use('/messages', require('./routes/messageRoutes'));
//app.use('/replies', require('./routes/replyRoutes'));
app.use('/auth', authRoutes);
//app.use('/data', require('./routes/dataRoutes'));

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));