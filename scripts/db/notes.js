let DB = require('./conn');
let debug= require('debug')('bracubot:server');
let template = 'Here is the notes of %course_code% : %course_name% course: %link%';
let notes = {
    getCourseLink: function(course_code, callback){
        debug("querying for: " + course_code);
        DB.query('SELECT notes.course_code, notes.link, courses.course_name FROM notes INNER JOIN courses ON ' +
            'courses.course_code = notes.course_code WHERE notes.course_code = ? AND verified = 1'
            , course_code,callback);
    },
    getTemplate: function(course_code, reply){
        this.getCourseLink(course_code, populator);
        function populator(data, err) {
            debug(data);
            template = template.replace("%course_code%", data[0].course_code);
            template = template.replace("%link%", data[0].link);
            template = template.replace("%course_name%", data[0].course_name);
            reply(template);
        };
    },
};

module.exports = notes;
