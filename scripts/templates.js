let util = require('util');
let debug = require('debug')('bracubot:server');
let DB = require('./db/conn');

let templates = [];
templates["teacher"] = "%name%. Initial: %initial%. Room number: %room_number%. Email address: %mail_id%";
templates["greetings"] = [":D", "Hi", "Hello :D", "Heyyyy ^_^"];
templates["mail_id"] = "Here is the mail address of %name% sir: %mail_id%";

let temple = {
    asking: {
        'note': {
            out : 'Here is the notes of %course_code% : %course_name% course: %link%',
            query: 'SELECT notes.course_code, notes.link, courses.course_name FROM notes INNER JOIN courses ON ' +
                'courses.course_code = notes.course_code WHERE notes.course_code = ? AND verified = 1',
        },
        'greetings': {
            out: ':D',
        }
    },
};

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
            console.log(data);
            if(!data) throw err;
            data = data[0];
            var property;
            var str = temple.asking[tagged.asking].out;
            let res = str;
            for(property in data){
                var prevStr = str;
                res = res.replace("%" + property +"%", data[property]);
                if(prevStr == res) console.error('Something wrong while replacing.');
            }
            reply(res);
        };
        // notes.getTemplate(tagged.params.value, callback);
        let asking = temple.asking[tagged.asking];
        if(asking.query){
            DB.query(asking.query, tagged.params.value, callback);
        } else {
            reply(asking.out);
        }
};

module.exports.populate = function (tagged, reply) {
    debug('populating');
    askingInflater(tagged,reply);
};