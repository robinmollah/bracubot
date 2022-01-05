const firestore = require('./db/firestore');
let failedAnswers = [
    "Sorry, I don't have an answer for this query.",
    "No idea, do you know that?",
    "I don't have an answer, but you can help me to improve. Type 'contribute'.",
    "Sorry, I cannot understand your query."
]

module.exports.fetchPatterns = () => {
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

module.exports.tag = function (msg, pattern_list) {
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
        reject(failedAnswers[Math.floor(Math.random() * failedAnswers.length)]);
    });
};
