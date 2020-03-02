const express = require("express");
const utils = require("../db/utils");
const router = express.Router();

// Lister les projects
router.get("/projects", (req, res) => {
  let sqlQuery = "SELECT * FROM projects";
  utils.executeQuery(sqlQuery, [], (err, result) => {
    res.json({ projectsList: result.rows });
  });
});

// Supprimer le projet dont l'ID est passée en param
router.delete("/projects/:id([0-9]*)", (req, res) => {
  const sql = "DELETE FROM projects WHERE id=$1";
  utils.executeQuery(sql, [req.params.id], (err, result) => {
    res.json({ message: "Projet supprimé avec succès" });
  });
});

// Afficher le detail du projet dont l'ID est passée en param
router.get("/projects/:id([0-9]*)", (req, res) => {
  const sql = "SELECT * FROM projects WHERE id=$1";
  utils.executeQuery(sql, [req.params.id], (err, result) => {
    res.json({ project: result.rows[0] });
  });
});

// Ajouter un nouveau projet
router.post("/projects", (req, res) => {
  // TODO
});

// Mettre à jour le projet dont l'ID est passée en param
router.patch("/projects/:id([0-9]*)", (req, res) => {
  // TODO
});

module.exports = router;
