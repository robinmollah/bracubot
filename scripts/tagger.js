let debug = require('debug')('bracubot:server');


let regex_list = [
    {
        pattern: '/\\w{3}\\s?\\d{3}/i',
        asking: 'note',
        params: {
            name: 'course_code',
            value: '',
        }
    }, {
        pattern: '/(hi|hello|he(y)+)/gi',
        asking: 'greetings',
        params: {
            name: 'greetings',
            value: '',
        }
    }
];

let tag = function (msg) {
    var regex;
    for(regex in regex_list){

    }
};

module.exports.tag = tag;