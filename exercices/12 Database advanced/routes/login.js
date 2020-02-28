const express = require("express");
const utils = require("../db/utils");

const router = express.Router();


// Affichager de la page de login
router.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

// Authentification de l'utilisateur
router.post("/send", (req, res) => {
  const form = req.body;
  let resultMessage = "";
  const sql = "SELECT * FROM users WHERE username=$1 AND unsecured_password=$2";
  const params = [form.username, form.password];

  // Execution des commandes SQL
  // On verifie que le couple username + password existe
  // Puis on render la vue
  utils.executeQuery(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const userFound = result.rows[0];

      // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie,
      // ainsi que le username
      if (userFound) {
        req.session.userId = userFound.id;
        req.session.username = userFound.username;
        res.locals.username = userFound.username;


        resultMessage = `Vous êtes connecté en temps que ${userFound.username}`;
      } 
      else {
        resultMessage = "L'identifiant ou le mot de pass sont incorect";
      }

      res.render("login", {
        title: "Login",
        info: resultMessage
      });
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
