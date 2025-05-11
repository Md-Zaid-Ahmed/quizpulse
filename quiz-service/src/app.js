const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Quiz Database'))
  .catch(err => console.error('Database Error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const quizRoutes = require('./routes/quizRoutes');
app.use('/api/quizzes', quizRoutes);

module.exports = app;