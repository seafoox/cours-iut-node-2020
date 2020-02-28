const express = require("express");
const utils = require("../db/utils");
const helpers = require("./helpers");

const router = express.Router();

// Afficher la liste des projets
router.get("/", (req, res) => {  
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

// Afficher le detail d'un projet
router.get("/:id([0-9]+)", (req, res) => {
  utils.executeQuery("SELECT * FROM projects WHERE id=$1", [req.params.id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } 
      else {
        const projectDetails = result.rows[0];
        res.render("project_details", {
          title: `Projet ${req.params.id}`,
          projectDetails: projectDetails
        });
      }
    }
  );
});

// ----------------------------------------------------------------
// 
// Pour les utilisateurs authentifiés uniquement
// 
// ----------------------------------------------------------------

// Afficher la page d'ajout d'un projet
// Il y a deux callback qui s'executent l'une après l'autre
// si la premiere callback appelle "next()"
router.get("/add", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  res.render("project_add", {
    title: `Ajouter un nouveau projet`
  });
})

// Ajouter un projet en BD
router.post("/create", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const form = req.body;
  const sql = "INSERT INTO projects (name, description) VALUES ($1, $2)";
  utils.executeQuery(sql, [form.name, form.description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.render("project_add", {
        message: 'Ajout réussi',
        title: `Ajouter un nouveau projet`
      });
    }
  });
})

// Mettre à jours un projet existant
// @todo
// router.XX("/xxx", (req, res) => {

// });

// Supprimer  projet existant
// @todo
// router.XX("/xxx", (req, res) => {

// });




module.exports = router;
