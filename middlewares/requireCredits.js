module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403, { 'error': 'Not enough credits!' });
  }

  next(); // everything looks good, keep going!!
};
