const projectsServices = require("../services/projects");
const usersServices = require("../services/users");
const mailerServices = require("../services/mailer");

const helpers = require("../helpers/helpers");
const helpersMW = require("./helpers");
const express = require("express");
const jwt = require('jsonwebtoken');
const utils = require("../db/utils");
const config = require("../config.js");
const router = express.Router();


router.get('/email', (req, res, next) => {
  mailerServices.sendEmail({}, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }
    res.json({ message: 'Message sent: ' + result.response });

  });
});

// Ajout d'un utilisateur
// @param: username, password, email, firstname, lastname
router.post('/users/create', (req, res, next) => {

  usersServices.create(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    res.json({
      message: `Utilisateur ${result.username} / ${result.email} sauvegardé avec succès.`,
      id: result.id,
      username: result.username,
      email: result.email
    });
  });
});

// Authentification et récupération du token JWT
router.post("/users/login", (req, res) => {

  usersServices.authenticate(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: result });
      return;
    }

    const userFound = result;
    if (userFound) {
      const token = jwt.sign(
        { username: req.body.username }, 
        config.secret, 
        { expiresIn: '24h' }
      );
      res.json({
        message: 'Authentication successful!',
        token: token
      });
    } else {
      res.status(403).json({
        message: 'Incorrect username or password'
      });
    }
  });
});

// GET: Lister les projects
// ----------------------------------------------
// Parameters: /projects?orderby=createdAt_asc
//
// Example de réponse
// ------------------
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
  const orderBy = req.query.orderby;
  projectsServices.getAll(orderBy, (err, projectsList) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    // Ajouter l'URI depuis laquelle avoir les details du projet
    projectsList = projectsList.map(project => ({ 
      ...project, 
      "@details_uri": `${helpers.getBaseURI(req)}/api/projects/${project.id}` 
    }));
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
router.post("/projects", helpersMW.checkToken, (req, res) => {
  projectsServices.save(req.body, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    res.json({ 
      message: `Projet ${result.projectId} sauvegardé avec succès.`,
      id: result.projectId,
      '@details_uri': `${helpers.getBaseURI(req)}/api/projects/${result.projectId}`
    });
  });
});

// Supprimer le projet dont l'Id est passée en param
router.delete("/projects/:id([0-9]*)", helpersMW.checkToken, (req, res) => {

  projectsServices.deleteById(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ message: err });
      return;
    }

    res.json({ message: `Projet ${req.params.id} supprimé avec succès.` });
  });
});

// Mettre à jour le projet dont l'ID est passée en param
router.patch("/projects/:id([0-9]*)", helpersMW.checkToken, (req, res) => {
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
      message: `Projet ${req.params.id} mise à jour avec succès.`,
      '@details_uri': `${helpers.getBaseURI(req)}/api/projects/${project.id}`
    });
  });
});

module.exports = router;
