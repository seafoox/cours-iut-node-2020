const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {
  	title: 'Login'
  });
});

router.post('/send', (req, res) => {
  let resultMessage = '';
  const form = req.body;

  const userFound = verifyUser(form.login, form.password);

  if (userFound) {
    resultMessage = `Vous êtes connecté en temps que ${userFound.username}`;
  }
  else {
    resultMessage = `L'identifiant ou le mot de passe est incorrect`;
  }

  res.render('login', {
    title: 'Login',
    info: resultMessage
  });
});

function verifyUser(username, password) {
  console.log(username, password);
  const json = fs.readFileSync(__dirname + '/../users.json', 'utf8');
  const usersList = JSON.parse(json);
  let userFound = null;

  userFound = usersList.find(user =>
    user.username === username &&
    user.password === password
  );

  return userFound;
}

module.exports = router;
