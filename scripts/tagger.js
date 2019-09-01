let debug = require("debug")("bracubot:server");
let DB = require('./db/conn');

let regex_list = function(fetchedPatterns){
    DB.query('SELECT * FROM patterns', null, callback);
    function callback(data, err){
        fetchedPatterns(data);
    }
}

let tag = function (msg, regex_list, callback) {
    let pattern;
    for(pattern of regex_list){
        let pat = new RegExp(pattern.pattern, 'gim');
        let match = pat.exec(msg);
        if(!match) continue;
        if(pattern.param_name == 'name'){
            match[1] = '%' + match[1] + '%'; // Resolves SQL Like statement issue
        }
        console.log(match);
        match.shift();
        callback(pattern, match);
        return pattern;
    }
    console.error("No match found");
    callback(null, null);
    return null;
};

module.exports.tag = tag;
module.exports.fetchPatterns = regex_list;