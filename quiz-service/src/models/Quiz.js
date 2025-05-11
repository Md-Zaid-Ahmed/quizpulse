const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  roomCode: { 
    type: String, 
    required: true,
    unique: true,
    default: () => Math.random().toString(36).substr(2, 6).toUpperCase() // Generate random room code
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);