const express = require('express');
const router = express.Router();
const { Quiz, Question } = require('../models');
const authMiddleware = require('../middleware/auth');

// POST /quizzes (Create new quiz)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    
    const quiz = new Quiz({
      title,
      createdBy: req.userId // From JWT
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /quizzes/:id/questions (Add question to quiz)
router.post('/:id/questions', authMiddleware, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    // Authorization check
    if (quiz.createdBy.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const question = new Question({
      ...req.body,
      quizId: quiz._id
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /quizzes (List user's quizzes)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.userId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;