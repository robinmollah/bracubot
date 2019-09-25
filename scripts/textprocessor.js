const fbapi = require('./fbapi');
const tagger = require('./tagger');
const templates = require('./templates');
const failcases = require('./failcases');

test = false;
module.exports.test = test;
var query;

let process = function (recieved_message){
    query = recieved_message;
    tagger.fetchPatterns(function(data){
        return tagger.tag(recieved_message, data, tagEnd);
    });
    function tagEnd(pattern, values){
        if(pattern) {
            templates.populate(pattern, values, reply);
        } else {
            reply();
        }
    };
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