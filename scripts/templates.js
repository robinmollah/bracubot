let util = require('util');
let debug = require('debug')('bracubot:server');
let DB = require('./db/conn');

let askingInflater = function(tagged, reply){
        function callback(data, err){
            if(!data) throw err;
            data = data[0];
            var property;
            let str = tagged.out;
            let res = str;
            for(property in data){
                let prevStr = str;
                res = res.replace("%" + property + "%", data[property]);
                if(prevStr == res) console.error('Something wrong while replacing.');
            }
            reply(res);
        };
        // notes.getTemplate(tagged.params.value, callback);
        if(tagged.query){
            DB.query(tagged.query, [tagged.params.value], callback);
        } else {
            reply(tagged.out);
        }
};

module.exports.populate = function (tagged, reply) {
    debug('populating');
    askingInflater(tagged,reply);
};