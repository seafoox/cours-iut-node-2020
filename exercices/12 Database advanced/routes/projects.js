const express = require("express");
const utils = require("../db/utils");

const router = express.Router();

router.get("/", (req, res) => {
  // Execution des commandes SQL
  
  utils.executeQuery("SELECT * FROM projects LIMIT 100", [], (err, result) => {
    if (err) {
      res.status(500).send(err);
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
  utils.executeQuery("SELECT * FROM projects WHERE id=$1", [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send(err);
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
