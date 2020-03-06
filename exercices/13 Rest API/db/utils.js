const utils = {};
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
  user: "tbkoyffh",
  host: "john.db.elephantsql.com",
  database: "tbkoyffh",
  password: "AgF-A5vaCFNapXo3w5foX-Rn7GmkeFHI",
  port: 5432
});

utils.executeQuery = (sql, params, callback) => {
  pool.query(sql, params, callback);
};

module.exports = utils;
