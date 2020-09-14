const tagger = require('../tagger');
const templates = require('../templates');
const failcases = require('../failcases');
const fs = require('fs');

test = false;
module.exports.test = test;
let query, res;

let process = function (recieved_message, response){
    res = response;
    query = recieved_message;
    fs.readFile(__dirname + '/patterns.json', (err, data) => {
        if(err){
            console.error("Failed to read patterns", err);
            return;
        }
        tagger.tag(recieved_message, JSON.parse(data), tagEnd);
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