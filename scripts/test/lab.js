const tagger = require('../tagger');
const templates = require('../templates');
const failcases = require('../failcases');

test = false;
module.exports.test = test;
let query, res;

let process = function (recieved_message, response){
    res = response;
    query = recieved_message;
    tagger.fetchPatterns(function(data){
        return tagger.tag(recieved_message, data, tagEnd);
    });
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