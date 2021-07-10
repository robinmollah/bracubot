const firestore = require('./db/firestore');

let regex_list = function(){
    return firestore.collection('patterns').get()
        .then(snapshot => {
            let patterns = new Array();
            snapshot.forEach(doc => patterns.push(doc.data()));
            return patterns;
        })
        .catch(err =>
            console.log("error fetching patterns: [possibly failed to login to firestore]", err)
        );
};

let tag = function (msg, pattern_list, callback) {
    return new Promise((resolve, reject) => {
        for(let pattern of pattern_list){
            let pat = new RegExp(pattern.pattern, 'gim');
            let match = pat.exec(msg);
            if(!match) continue;
            if(pattern.query && pattern.query.indexOf('LIKE') > -1){
                match[1] = '%' + match[1] + '%'; // Resolves SQL Like statement issue
            }
            match.shift();
            // callback(pattern, match);
            resolve({
                pattern: pattern,
                values: match
            });
        }
        reject("No match found");
    });
};

module.exports.tag = tag;
module.exports.fetchPatterns = regex_list;
