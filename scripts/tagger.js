let debug = require("debug")("bracubot:server");


let regex_list = [
    {
        pattern: '\\w{3}\\s?\\d{3}',
        asking: "note",
        params: {
            name: "course_code",
            value: "",
        }
    }, {
        pattern: "(hi|hello|he(y)+)",
        asking: "greetings",
        params: {
            name: "greetings",
            value: "",
        }
    }
];

let tag = function (msg) {
    let regex;
    for(regex of regex_list){
        debug(msg);
        let match = msg.match(new RegExp(regex.pattern, 'gi'));
        if(!match) continue;
        debug(match);
        return match;
    }
    return null;
};

module.exports.tag = tag;