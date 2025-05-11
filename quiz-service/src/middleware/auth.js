const { expressjwt: jwt } = require("express-jwt");

const authMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  getToken: (req) => {
    if (req.headers.authorization?.startsWith('Bearer ')) {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  }
});

//Add user ID to request object
const authMiddlewareWithUser = (req, res, next) => {
  authMiddleware(req, res, (err) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    
    //Set user ID from JWT payload
    req.userId = req.auth.userId;
    next();
  });
};

module.exports = authMiddlewareWithUser;