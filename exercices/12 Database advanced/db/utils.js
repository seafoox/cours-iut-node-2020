const utils = {}
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
  user: "",
  host: "",
  database: "",
  password: "",
  port: 5432
});

utils.executeQuery = (sql, params, callback) => {
  pool.query(sql, params, callback);
}

module.exports = utils
