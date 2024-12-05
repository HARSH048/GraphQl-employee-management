const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (req) => {
  const authHeader = req.headers;
  if (!authHeader) throw new Error('Authorization header missing.');

  const token = authHeader.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
 // console.log(req.user)
};

const requireRole = (role) => {
  return (req) => {
    if (req.user.role !== role) throw new Error('Access denied.');
  };
};

module.exports = { generateToken, verifyToken, requireRole };
