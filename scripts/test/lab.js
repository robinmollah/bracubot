const tagger = require('../tagger');
const templates = require('../templates');
const failcases = require('../failcases');

test = false;
module.exports.test = test;
let query, res;

let process = async function (recieved_message, response){
    res = response;
    query = recieved_message;
    // TODO cache patterns in local repository
    let data = await tagger.fetchPatterns();
    console.log(data.length);
    let tags = await tagger.tag(recieved_message, data);
    tagEnd(tags.pattern, tags.values);
    function tagEnd(pattern, values){
        console.log("Tagged");
        if(pattern) {
            templates.populate(pattern, values, reply);
        } else {
            reply();
        }
    };
};

let reply = function(msg, err){
    if(!msg) {
        return res.send(JSON.stringify('Sorry can\'t understand you.'));
    }
    res.send(JSON.stringify(msg));
    return msg;
};

exports.process = process;
