var DB = require('./db/conn-promise');

// insertFailcase("Email id of THD", "NI");

function insertFailcase(query, type) {
    var insertion = DB.query("INSERT INTO failcases (query, type) VALUES ('" + query +
        "', '" + type + "');");
    insertion.then((data) => {
        // console.log(data);
        // DB.close();
    });
}

module.exports.insertFailcase = insertFailcase;