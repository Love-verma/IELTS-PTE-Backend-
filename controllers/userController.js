const jwt = require('jsonwebtoken');


const verifyToken = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new Error('Unauthorized: Token is missing');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Unauthorized: Invalid token');
  }
};


exports.getUserProfile = (req, res) => {
  try {
    const user = verifyToken(req);
    res.json({ message: `Welcome, ${user.role}`, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.adminDashboard = (req, res) => {
  try {
    const user = verifyToken(req);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access Denied' });
    }

    res.json({ message: 'Welcome to the Admin Dashboard!' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};


exports.teacherDashboard = (req, res) => {
  try {
    const user = verifyToken(req);
    if (user.role !== 'teacher') {
      return res.status(403).json({ message: 'Access Denied' });
    }

    res.json({ message: 'Welcome to the Teacher Dashboard!' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

