const fbapi = require('./fbapi');
const tagger = require('./tagger');
const templates = require('./templates');
const failcases = require('./failcases');

test = false;
module.exports.test = test;
let query;

let process = async function (recieved_message){
    query = recieved_message;
    let patterns = await tagger.fetchPatterns(); // retrieves all patterns from firebase
    tagger.tag(recieved_message, patterns) // tags the message
        .then((patternPack) => {
            if(patternPack.pattern) {
                templates.populate(patternPack.pattern, patternPack.values, reply);
            } else {
                reply();
            }
        })
        .catch(reply);
};

let reply = function(msg, err){
    if(!msg) {
        failcases.insertFailcase(query, "NP");
        return fbapi.send('Sorry can\'t understand you.');
    }
    if(err) failcases.insertFailcase(query, err);
    fbapi.send(msg);
    return msg;
};

exports.process = process;
