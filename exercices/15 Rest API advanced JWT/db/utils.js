const utils = {};
const config = require("../config.js");
const { Pool } = require("pg");

// Inialisation de la connexion
const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.database,
  password: config.database.password,
  port: config.database.port
});

utils.executeQuery = (sql, params, callback) => {
  pool.query(sql, params, callback);
};

module.exports = utils;
