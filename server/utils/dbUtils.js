var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fazenda'
});

function query(sql, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(err, null);
        } else {
            connection.query(sql
                , function(err, rows) {
                    callback(err, rows);
                    connection.release();
                }
            );
        }
    });
}

module.exports = {
    query: query
};