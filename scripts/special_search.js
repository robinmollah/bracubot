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

function day(str = 'today'){
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let today = new Date();
    let tomorrow = new Date();
    let oneday = 24 * 60 * 60 * 1000;
    tomorrow.setTime(today.getTime() + oneday);
    let yesterday = new Date();
    yesterday.setTime(today.getTime() - oneday);
    let resDays = {
        "today": today.getDay(),
        "tomorrow": tomorrow.getDay(),
        "yesterday": yesterday.getDay()
    };
    return days[resDays[str]];
}

function current_slot(){
    return new Date().toJSON();
}

module.exports.now = current_slot;
module.exports.day = day;
module.exports.run = function (funcName, params){
    switch(funcName){
        case "day":
            return day(params);
        default:
            return null;
    }
};