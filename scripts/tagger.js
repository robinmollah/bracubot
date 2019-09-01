let debug = require("debug")("bracubot:server");


let regex_list = [
    {
        pattern: '(\\w{3}\\s?\\d{3}).*notes',
        asking: "note",
        params: {
            name: "course_code",
            value: "",
        },
        out : 'Here is the notes of %course_code% : %course_name% course: %link%',
        query: 'SELECT notes.course_code, notes.link, courses.course_name FROM notes INNER JOIN courses ON ' +
            'courses.course_code = notes.course_code WHERE notes.course_code = ? AND verified = 1',
    }, {
        pattern: "^(hi|hello|he(y)+)",
        asking: "greetings",
        params: {
            name: "greetings",
            value: "",
        },
        out: ':D',
    },
    // TEACHERS
    {
        pattern: 'e?mail (?:address|id) of (\\w{4,15})(?:sir)?\?',
        asking: 'mail_id',
        params: {
            name: 'name',
            value: '',
        },
        out: 'Here is the email address of %name% sir, %mail_id%',
        query: 'SELECT name, mail_id FROM teachers where name like ?;',
    }, {
        pattern: 'e?mail (?:address|id) of (\\w{3})',
        asking: 'mail_id',
        params: {
            name: 'initial',
            value: '',
        },
        out: 'Here is the email address of %name% sir, %mail_id%',
        query: 'SELECT name, mail_id from teachers where initial = ?;'
    },{
        pattern: '(?:who is |full name of )(\\w{3,3})\?',
        asking: 'name',
        params: {
            name: 'initial',
            value: '',
        },
        out: 'Full name of %initial% is %name%',
        query: 'SELECT name, initial FROM teachers where initial = ?',
    },{
        pattern: 'who takes (\\w{3}\\d{3})(?: course)?',
        asking: 'initial',
        multi: true,
        params: {
            name: 'course_code',
            value: '',
        },
        out: '%course_code% is taken by: %initial%',
        query: 'SELECT DISTINCT initial, course_code FROM course_sections WHERE course_code = ?;',
    },{
        pattern: 'which courses are taken by (\\w{3})',
        asking: 'course_code',
        multi: true,
        params: {
            name: 'initial',
            value: '',
        },
        out: '%initial% takes: %course_code%',
        query: 'SELECT DISTINCT course_code, initial FROM course_sections WHERE initial = \'wra\';',
    },{
        pattern: 'room number of (\\w{3})\\b(?: sir)?\\??',
        asking: 'room_number',
        params: {
            name: 'initial',
            value: '',
        },
        out: '%name% seats in UB%room_number%',
        query: 'SELECT name, room_number FROM teachers where initial = ?',
    },{
        pattern: 'room number of (\\w{4,15})(?: sir)?\\??',
        asking: 'room_number',
        params: {
            name: 'name',
            value: '',
        },
        out: '%name% sir seats in UB%room_number%',
        query: 'SELECT name, room_number FROM teachers where name like ?',
    }
];

let tag = function (msg) {
    let regex;
    for(regex of regex_list){
        let pat = new RegExp(regex.pattern, 'gim');
        let match = pat.exec(msg);
        if(!match) continue;
        if(regex.params.name == 'name'){
            match[1] = '%' + match[1] + '%';
        }
        console.log(match);
        regex.params.value = match[1];
        return regex;
    }
    return null;
};

module.exports.tag = tag;