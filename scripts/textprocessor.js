const notestore = require('./notestore');
const fbapi = require('./fbapi');
const tagger = require('./tagger');
const templates = require('./templates');
test = false;
module.exports.test = test;


let process = function (recieved_message){
    let tagged = tagger.tag(recieved_message);
    if(tagged){
        templates.populate(tagged, reply);
    } else {
        reply();
    }
    function reply(msg){
        if(!msg) return fbapi.send('Sorry can\'t understand you.');
        fbapi.send(msg);
        return msg;
    }
};

exports.process = process;