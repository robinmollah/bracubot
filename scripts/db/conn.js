const mysql = require("mysql");
require('dotenv').config();

const DB_CONFIG = {
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}
let pool = mysql.createPool(DB_CONFIG);


let DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error(err);
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();
                if (!err) {
                    callback(rows);
                } else {
                    callback(null, err);
                }
            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;
