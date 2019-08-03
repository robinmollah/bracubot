let DB = require('./conn');
let debug= require('debug')('bracubot:server');
let template = {
    asking: {
        'note': {
            out : 'Here is the notes of %course_code% : %course_name% course: %link%',
            query: 'SELECT notes.course_code, notes.link, courses.course_name FROM notes INNER JOIN courses ON ' +
                'courses.course_code = notes.course_code WHERE notes.course_code = ? AND verified = 1',
        },
    },
};
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
            console.log(data);
            var property;
            data = data[0];
            for(property in data){
                var str = template;
                template = template.replace("%" + property +"%", data[property]);
                if(str == template){
                    console.error("There is a problem in template replacing");
                }
            }
            reply(template);
        };
    },
};

module.exports = notes;
