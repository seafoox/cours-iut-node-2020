const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

// Inialisation de la connexion
const pool = new Pool({
  user: "bochokmg",
  host: "dumbo.db.elephantsql.com",
  database: "bochokmg",
  password: "PaI0TWcf7kPrSgXOGicMD7X-3sHNJTF6",
  port: 5432
});

router.get("/", (req, res) => {
  // Execution des commandes SQL
  pool.query("SELECT * FROM projects LIMIT 100", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const projectsList = result.rows;
      res.render("projects", {
        title: "Projets",
        projectsList: projectsList
      });
    }
  });
});

router.get("/:id", (req, res) => {
  pool.query("SELECT * FROM projects WHERE id=$1", [req.params.id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        const projectDetails = result.rows[0];
        res.render("project_details", {
          title: `Projet ${req.params.id}`,
          projectDetails: projectDetails
        });
      }
    }
  );
});

module.exports = router;
