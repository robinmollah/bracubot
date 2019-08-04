let util = require('util');
let debug = require('debug')('bracubot:server');
let DB = require('./db/conn');

let templates = [];
templates["teacher"] = "%name%. Initial: %initial%. Room number: %room_number%. Email address: %mail_id%";
templates["greetings"] = [":D", "Hi", "Hello :D", "Heyyyy ^_^"];
templates["mail_id"] = "Here is the mail address of %name% sir: %mail_id%";

function getTemplate(asking){
    if(util.isArray(templates[asking])){
        let take = Math.floor(Math.random() * templates[asking].length);
        return templates[asking][take];
    } else {
        return templates[asking];
    }
};

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