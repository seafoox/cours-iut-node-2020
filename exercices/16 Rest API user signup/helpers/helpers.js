const helpers = {};
let _serverPort = null;

// Middleware 
helpers.limitAccessToAuthentificatedOnly = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.redirect('/');
  }
};

// Methodes permettant de set/get le sur lequel le serveur est lancé
helpers.setServerPort = (port=80) => { _serverPort = port; };
helpers.getServerPort = () => _serverPort;

helpers.getBaseURI = (req) => {
  return `${req.protocol}://${req.hostname}:${helpers.getServerPort()}`;
}

module.exports = helpers;
