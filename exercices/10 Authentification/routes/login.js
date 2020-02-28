const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/send', (req, res) => {
  let resultMessage = '';
  const form = req.body;

  const userFound = verifyUser(form.username, form.password);

  // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie
  if (userFound) {
    req.session.userId = userFound.id;
    req.session.username = userFound.username;
    res.locals.username = userFound.username;

    resultMessage = `Vous êtes connecté en temps que ${userFound.username}`;
  }
  else {
    resultMessage = 'L\'identifiant ou le mot de pass sont incorect';
  }
  res.render('login', {
    title: 'Login',
    info: resultMessage
  });
});

function verifyUser(username, password) {
  // Ouvre le fichier JSON avec la liste des users
  const json = fs.readFileSync(__dirname + '/../users.json', 'utf8');
  const users = JSON.parse(json);

  // Vérification des infos reçu de la saisie du formulaire et comparaison avec notre users.json
  let userFound = users.find(user =>
    user.username === username &&
    user.password === password
  );

    return userFound;
}

module.exports = router;
