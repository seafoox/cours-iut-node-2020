const express = require("express");
const usersServices = require("../services/users");
const utils = require("../db/utils");

const router = express.Router();

// Affichager de la page de login
router.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

// Authentification de l'utilisateur
router.post("/send", (req, res) => {

  usersServices.authenticate(req.body, (err, result) => {
    
    if (err) {
      req.session.infoMessage = "L'identifiant ou le mot de passe sont incorect";
      res.redirect("/login");
      return;
    }

    // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie,
    // ainsi que le username
    let userFound = result;
    if (userFound) {
      req.session.userId = userFound.id;
      req.session.username = userFound.username;
      res.locals.username = userFound.username;
      res.locals.isAuthentificated = true;

      req.session.infoMessage = `Vous êtes connecté en temps que ${userFound.username}`;
      res.redirect("/");
    } 
    else {
      req.session.infoMessage = "L'identifiant ou le mot de passe sont incorect";
      res.redirect("/login");
    }

  });
});

// Se déconnecter
router.get("/logout", (req, res) => {
  // Suppression de la session
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
