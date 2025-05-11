const { Quiz, Question } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = (io) => {

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userData = decoded;
      next();
    } catch (err) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.userData.userId}`);

    socket.on('join-room', async (roomCode) => {
      try {
        const quiz = await Quiz.findOne({ roomCode });
        if (!quiz) return socket.emit('error', 'Invalid room code');
        
        socket.join(roomCode);
        socket.emit('room-joined', {
          quizId: quiz._id,
          title: quiz.title
        });
      } catch (err) {
        socket.emit('error', 'Failed to join room');
      }
    });

    socket.on('start-quiz', async (quizId) => {
      try {
        const quiz = await Quiz.findById(quizId);
        if (quiz.createdBy.toString() !== socket.userData.userId) {
          return socket.emit('error', 'Unauthorized');
        }
        
        io.to(quiz.roomCode).emit('quiz-started');
      } catch (err) {
        socket.emit('error', 'Failed to start quiz');
      }
    });

    
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userData.userId}`);
    });
  });
};