const fbapi = require('./fbapi');
const tagger = require('./tagger');
const templates = require('./templates');
test = false;
module.exports.test = test;


let process = function (recieved_message){
    tagger.fetchPatterns(function(data){
        return tagger.tag(recieved_message, data, tagEnd);
    });
    function tagEnd(pattern, values){
        if(pattern) { // No pattern matched
            templates.populate(pattern, values, reply);
        } else {
            reply();
        }
    };
};

let reply = function(msg){
    if(!msg) return fbapi.send('Sorry can\'t understand you.');
    fbapi.send(msg);
    return msg;
};

exports.process = process;