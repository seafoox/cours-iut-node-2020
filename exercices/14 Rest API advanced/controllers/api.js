const projectsServices = require("../services/projects");
const helpers = require("../helpers/helpers");
const express = require("express");
const router = express.Router();


// GET: Lister les projects
// ----------------------------------------------
// Example de réponse
// {
//   "projectsList": [
//     {
//       "id": 1,
//       "name": "super projet",
//       "@details_uri": "http://localhost:3000/api/projects/1"
//     },
//     {
//       "id": 2,
//       "name": "le deuxieme projet",
//       "@details_uri": "http://localhost:3000/api/projects/2"
//     ...
//
router.get("/projects", (req, res) => {
  projectsServices.getAll((err, projectsList) => {
    if (err) {
      res.status(500).json( {message: err} );
      return;
    }
    // Ajouter l'URI depuis laquelle avoir les details du projet
    projectsList = projectsList.map(project => ({ ...project, '@details_uri': `${helpers.getBaseURI(req)}/api/projects/${project.id}` }));
    res.json({ projectsList: projectsList });
  });
});

// Afficher le detail du projet dont l'ID est passée en param
router.get("/projects/:id([0-9]*)", (req, res) => {
  projectsServices.getById(req.params.id, (err, projectDetails) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ project: projectDetails });
  });
});

// Ajouter un nouveau projet
router.post("/projects", (req, res) => {
  projectsServices.save(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ 
      'message': `Projet ${req.params.id} sauvegardé avec succès.`,
      'id': result.projectId,
      '@details_uri': `${helpers.getBaseURI(req)}/api/projects/${result.projectId}`
    });
  });
});

// Supprimer le projet dont l'Id est passée en param
router.delete("/projects/:id([0-9]*)", (req, res) => {

  projectsServices.deleteById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ 'message': `Projet ${req.params.id} supprimé avec succès.` });
  });
});

// Mettre à jour le projet dont l'ID est passée en param
router.patch("/projects/:id([0-9]*)", (req, res) => {
  // Créer un objet javascript dans lequel on va retrouver
  const projectDetails = {
    ...req.body,
    id: req.params.id
  };

  // On controle que tous les info necessaires ont bien été passées.
  if ((projectDetails.id && Object.values(projectDetails).length >= 2) === false) {
    res.status(500).json({ 
      'message': `Un ou plusieurs paramètres sont manquant.`
    });
    return; // Pour sortir de la fonction
  }

  projectsServices.update(projectDetails, (err, project) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ 
      'message': `Projet ${req.params.id} mise à jour avec succès.`,
      '@details_uri': `${helpers.getBaseURI(req)}/api/projects/${project.id}`
    });
  });
});

module.exports = router;
