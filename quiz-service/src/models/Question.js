const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quizId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Quiz', 
    required: true 
  },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, //Index of correct option
  order: { type: Number, required: true } //sequencing questions
});

module.exports = mongoose.model('Question', questionSchema);