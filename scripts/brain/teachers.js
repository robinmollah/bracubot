var DB = require('../db/conn');
var debug = require('debug')('bracubot:server');

var teachers = {
    getByName : function(name, res){
        debug("Querying name: " + name);
        DB.query("SELECT * FROM teachers WHERE name like '%" + name + "%'",
            null, function(data, err){
                if(!data){
                    debug(err);
                    throw err;
                }
                res.send(data[0]);
            });
    },
    getByInitial: function(initial, res){
    DB.query("SELECT * FROM teachers WHERE initial = ?",
        [initial], function(data, error){
            if(!data){
                debug(error);
                throw error;
            }
            res.send(data[0]);
        });
},
};

module.exports = teachers;