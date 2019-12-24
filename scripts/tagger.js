let debug = require("debug")("bracubot:server");
let DBPromise = require('./db/conn-promise');

let regex_list = function(fetchedPatterns){
    DBPromise.query('SELECT * FROM patterns', null).then(
        (data) => {
            fetchedPatterns(data);
            // DBPromise.close();
        }
    ).catch((reason) => {
        console.error(reason);
    })
};

let tag = function (msg, pattern_list, callback) {
    console.log("Pattern List: " + pattern_list);
    let pattern;
    for(pattern of pattern_list){
        let pat = new RegExp(pattern.pattern, 'gim');
        let match = pat.exec(msg);
        if(!match) continue;
        if(pattern.query.indexOf('LIKE') > -1){
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