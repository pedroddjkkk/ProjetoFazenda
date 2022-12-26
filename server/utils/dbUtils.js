var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "fazenda",
});

function query(sql, callback) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        log(err);
      } else {
        connection.query(sql, function (err, rows) {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      }
    });
  });
}

module.exports = {
  query: query,
};
