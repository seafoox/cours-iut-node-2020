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
    title: "Ajouter un nouveau projet"
  });
});

// Ajouter un projet en BD
router.post("/create", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const form = req.body;
  const sql = "INSERT INTO projects (name, description) VALUES ($1, $2)";
  utils.executeQuery(sql, [form.name, form.description], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.session.infoMessage = "Le projet à bien été ajouté.";
      res.redirect("/projects");
    }
  });
});

// Afficher la page de MAJ d'un projet
router.get("/:id([0-9]+)/update", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  utils.executeQuery("SELECT * FROM projects WHERE id=$1", [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const projectDetails = result.rows.length && result.rows[0];
      if (projectDetails) {
        res.render("project_update", {
          title: `Edition du projet ${projectDetails.id}`,
          projectId: projectDetails.id,
          defaultName: projectDetails.name,
          defaultDescription: projectDetails.description
        });
      }
      else {
        res.status(500).send(`Impossible de retrouver le projet ${req.params.id}`);
      }
    }
  });
});

// Mise à jour d'un projet en BD
router.post("/update", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const form = req.body;
  const sql = "UPDATE projects SET name=$1, description=$2 WHERE id=$3";
  utils.executeQuery(sql, [form.name, form.description, form.projectId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.session.infoMessage = `Le projet #${form.projectId} a été mis à jour.`
      res.redirect("/projects");
    }
  });
});

// Suppression d'un projet
router.get("/:id([0-9]+)/delete", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const projectId = req.params.id;
  const sql = "DELETE FROM projects WHERE id=$1";
  utils.executeQuery(sql, [projectId], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.session.infoMessage = `Le projet #${projectId} a été supprimé.`
      res.redirect("/projects");
    }
  });
});

module.exports = router;
