let DB = require('./db/conn');

let slots = [
    '08:00 AM',
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM'
];

function consultation(params){
    let query = 'SELECT * FROM course_sections WHERE weekday = ' + params.day + ' AND initial = ' +
        '\'' + params.initial + '\';';
    // get times of class
    let times_of_class;
    // Empty slots

}

function current_slot(){
    return new Date().toJSON();
}

module.exports.now = current_slot;