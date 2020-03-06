const helpers = {};

// Middleware 
helpers.limitAccessToAuthentificatedOnly = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = helpers;
