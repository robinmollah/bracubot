let debug = require("debug")("bracubot:server");
let DBPromise = require('./db/conn-promise');
const firestore = require('./db/firestore');

let regex_list = function(fetchedPatterns){
    firestore.collection('patterns').get()
        .then(snapshot => {
            let patterns = new Array();
            snapshot.forEach(doc => patterns.push(doc.data()));
            fetchedPatterns(patterns);
        })
        .catch(err =>
            console.log("error fetching patterns: [possibly failed to login to firestore]", err)
        );
};

let tag = function (msg, pattern_list, callback) {
    let pattern;
    for(pattern of pattern_list){
        let pat = new RegExp(pattern.pattern, 'gim');
        let match = pat.exec(msg);
        if(!match) continue;
        if(pattern.query && pattern.query.indexOf('LIKE') > -1){
            match[1] = '%' + match[1] + '%'; // Resolves SQL Like statement issue
        }
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