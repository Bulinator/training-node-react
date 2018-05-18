module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401, { 'error': 'You must log in' });
  }

  next(); // everything looks good, keep going!!
};
