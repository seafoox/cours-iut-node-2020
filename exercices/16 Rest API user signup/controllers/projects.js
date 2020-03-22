const express = require("express");
const projectsServices = require("../services/projects");
const helpers = require("./helpers");

const router = express.Router();

// Afficher la liste des projets
router.get("/", (req, res) => {

  // Via la couche services des projets on recupère la liste de 
  // tous les projets dans notre base de données;
  projectsServices.getAll("createdAt_desc", (err, projectsList) => {
    if (err) {
      res.status(500).send(err);
      return;
    } 
    
    res.render("projects", {
      title: "Projets",
      projectsList: projectsList
    });

  });
});

// Afficher le detail d'un projet
router.get("/:id([0-9]+)", (req, res) => {
  
  projectsServices.getById(req.params.id, (err, projectDetails) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
      
    res.render("project_details", {
      title: `Projet ${req.params.id}`,
      projectDetails: projectDetails
    });

  });
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
  const projectDetails = req.body; // De la forme "{ name, description }"
  
  projectsServices.save(projectDetails, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    // Afin d'afficher un message après la redirection
    // on le sauvegarde temporairement dans la session
    // (voir "Middleware custom", ligne 20 de app.js)
    req.session.infoMessage = "Le projet à bien été ajouté.";
    res.redirect("/projects");
  });
});

// Afficher la page de MAJ d'un projet
router.get("/:id([0-9]+)/update", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const projectId = req.params.id;

  projectsServices.getById(req.params.id, (err, project) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    res.render("project_update", {
      title: `Edition du projet ${project.id}`,
      projectId: project.id,
      defaultName: project.name,
      defaultDescription: project.description
    });
  });
});

// Mise à jour d'un projet en BD
router.post("/update", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const projectId = req.body.projectId;

  projectsServices.update(req.body, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    req.session.infoMessage = `Le projet #${projectId} a été mis à jour.`;
    res.redirect("/projects");
  });
});

// Suppression d'un projet
router.get("/:id([0-9]+)/delete", helpers.limitAccessToAuthentificatedOnly, (req, res) => {
  const projectId = req.params.id;

  projectsServices.deleteById(projectId, (err, project) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    req.session.infoMessage = `Le projet #${projectId} a été supprimé.`;
    res.redirect("/projects");
  });
});

module.exports = router;
