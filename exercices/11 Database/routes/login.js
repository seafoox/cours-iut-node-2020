const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

// Inialisation de la connexion à la BD
const pool = new Pool({
  user: "bochokmg",
  host: "dumbo.db.elephantsql.com",
  database: "bochokmg",
  password: "PaI0TWcf7kPrSgXOGicMD7X-3sHNJTF6",
  port: 5432
});

// Affichage de la page login
router.get("/", (req, res) => {
  res.render("login", { title: "Login" });
});

// Deconnexion
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Authentification du user
router.post("/send", (req, result) => {
  const form = req.body;
  let resultMessage = "";
  const sql = "SELECT * FROM users WHERE username=$1 AND unsecured_password=$2";
  const params = [form.username, form.password];

  // Execution des commandes SQL
  // On verifie que le couple username + password existe
  pool.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      const userFound = res.rows[0];

      // Si userFound !== null, on le sauvegarde dans la session à l'aide d'un cookie
      if (userFound) {
        req.session.userId = userFound.id;
        req.session.username = userFound.username;
        result.locals.username = userFound.username;

        resultMessage = `Vous êtes connecté en temps que ${userFound.username}`;
      } else {
        resultMessage = "L'identifiant ou le mot de pass sont incorect";
      }
      result.render("login", {
        info: resultMessage,
        title: "Login"
      });
    }
  });
});

module.exports = router;
