const express = require("express");
const utils = require("../db/utils");
const router = express.Router();

// Lister les projects
router.get("/projects", (req, res) => {
  let sortBy = req.query.sortBy;
  let orderByString = "id DESC";

  switch (sortBy) {
    case "name_asc":
      orderByString = "name ASC";
      break;

    case "name_desc":
      orderByString = "name DESC";
      break;

    case "createdAt_asc":
      orderByString = "created_at ASC";
      break;

    case "createdAt_asc":
      orderByString = "created_at DESC";
      break;
  }

  let sqlQuery = "SELECT * FROM projects ORDER BY $1";
  utils.executeQuery(sqlQuery, [orderByString], (err, result) => {
    res.json({ projectsList: result.rows });
  });
});

// Ajouter un nouveau projet
router.post("/projects", (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO projects (name, description) VALUES ($1,$2)";
  utils.executeQuery(sql, [params.name, params.description], (err, result) => {
    res.json({ message: "Projet ajouté avec succès" });
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

// Mettre à jour le projet dont l'ID est passée en param
router.patch("/projects/:id([0-9]*)", (req, res) => {
  const projectId = req.params.id;
  const sql = "UPDATE projects SET name=$1, description=$2 WHERE id=$3";
  utils.executeQuery(sql , [req.body.name, req.body.description, req.params.id], (err, result) => {
    res.json({ message: "Projet MAJ avec succès" });
  });
});

module.exports = router;
