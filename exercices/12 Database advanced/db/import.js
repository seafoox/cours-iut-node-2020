const { Pool } = require("pg");
const fs = require("fs");

// Import du fichier avec les commandes SQL
const dbFilePath = `${__dirname}/populate.sql`;
const sql = fs.readFileSync(dbFilePath).toString();

// Inialisation de la connexion
const pool = new Pool({
  user: "",
  host: "",
  database: "",
  password: "",
  port: 5432
});

// Execution des commandes SQL
pool.query(sql, (err, res) => {
  if (err) {
    console.log(res);
  } else {
    console.log("Import terminé avec succès");
  }
});
