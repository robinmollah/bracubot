let util = require('util');
let debug = require('debug')('bracubot:server');

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

let askingInflater = {
    "note": function(tagged, reply){
        let notes = require('./db/notes');
        function callback(template, err){
            reply(template);
        };
        notes.getTemplate(tagged.params.value, callback);
    },
    "greetings": function(tagged, reply){
        reply(getTemplate(tagged.asking));
    },
};

module.exports.populate = function (tagged, reply) {
    debug('populating');
    askingInflater[tagged.asking](tagged,reply);
};