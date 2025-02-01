const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  // const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]
  const token = req.header('Authorization');   // Athorization or 'x-access-token'
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    next();
  };
};
