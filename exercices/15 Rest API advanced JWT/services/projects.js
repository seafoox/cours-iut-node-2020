const utils = require("../db/utils");

// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = {
  getAll,
  getById,
  save,
  update,
  deleteById
};

// ---------------------------------
//  Function CRUD d'un Projet
// --------------------------------

// Retourne la liste des projets
function getAll(sortBy, callback) {
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

    case "createdAt_desc":
      orderByString = "created_at DESC";
      break;
  }

  const query = `SELECT id, name FROM projects ORDER BY ${orderByString} LIMIT 100`;
  utils.executeQuery(query, [], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows);
    }
  });
}

// Retourn le detail d'un projet
function getById(projectId, callback) {
  const query = "SELECT * FROM projects WHERE id=$1";
  utils.executeQuery(query, [projectId], (err, result) => {
    if (err) {
      callback(true, err);
    } else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver le projet ${projectId}`);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}

// Sauvegarder un projet
// 
// (Notation ES6 appelée "Destructuring assignment" pour le passage de paramètres
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
function save({ name, description }, callback) {
  const query = "INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *";
  utils.executeQuery(query, [name, description], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, { projectId: result.rows[0].id });
    }
  });
}

// Mise à jour d'un projet en BD
function update({ projectId, name, description }, callback) {
  const query = "UPDATE projects SET name=$1, description=$2 WHERE id=$3 RETURNING *";
  utils.executeQuery(query, [name, description, projectId], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}

// Supprimer un projet
function deleteById(projectId, callback) {
  const query = "DELETE FROM projects WHERE id=$1";
  utils.executeQuery(query, [projectId], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}

