let util = require('util');
let debug = require('debug')('bracubot:server');

let templates = [];
templates["teacher"] = "%name%. Initial: %initial%. Room number: %room_number%. Email address: %mail_id%";
templates["greetings"] = [":D", "Hi", "Hello :D", "Heyyyy ^_^"];


function getTemplate(asking){
    if(util.isArray(templates[asking])){
        //TODO take random
        return templates[asking][0];
    } else {
        return templates[asking];
    }
};


module.exports.populate = function (tagged, reply) {
    debug('populating');
    if(tagged.asking == 'note'){
        var notes = require('./db/notes');
        function callback(template, err){
            reply(template);
        };
        notes.getTemplate(tagged.params.value, callback);
    }
};