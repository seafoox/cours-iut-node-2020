const utils = require("../db/utils");
const bcrypt = require('bcrypt');

// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = {
  create,
  authenticate
};

// Enregistrement d'un nouvel utilisateur
// 
// (Notation ES6 appelée "Destructuring assignment" pour le passage de paramètres
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
function create({ username, password, firstname, lastname, email }, callback) {
  // @TODO: Verifier que les paratrès sont renseignés

  // On encode le password
  bcrypt.hash(password, 10, (err, encryptedPasswordHash) => {

    var keep = encryptedPasswordHash;
    // Sauvegarde de l'utilisateur en base de données
    const query = "INSERT INTO users (username, encrypted_password, firstname, lastname, email) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    utils.executeQuery(query, [username, encryptedPasswordHash, firstname, lastname, email], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
          // On passe l'utilisateur crée comme paramètre de la callback
        const createdUser = result.rows[0];
        delete createdUser.encrypted_password;
        callback(undefined, createdUser);
      }
    });

  }); 
}

function authenticate({ username, password }, callback) {
  
  // Execution des commandes SQL
  // On verifie cherche si le user exist
  utils.executeQuery("SELECT * FROM users WHERE username=$1", [username], (err, result) => {
    if (err) {
      callback(true, err);
    } 

    // On verifie que le password sauvegardé correspond 
    // à celui de la base de données
    else 
    {
      const userFound = result.rows[0];

      bcrypt.compare(password, userFound.encrypted_password, function (err, result) {
        if (result == true) {
          delete userFound.encrypted_password; // On retire le password de l'objet user que l'on va retourner afin de pas risquer de l'exposer 
          callback(false, userFound);
        } else {
          callback(true, 'Incorrect password');
        }
      });
    }  

  });
}