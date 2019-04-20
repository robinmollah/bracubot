const notestore = require('./notestore');
const fbapi = require('./fbapi');

var process = function (recieved_message){
    var response;
    var courseId = getCourseId(recieved_message);
    if(courseId){
        notestore.getCourseLink(courseId[0]).then(
            note => {
                console.log(note);
                fbapi.send(note);
            }, err => {
                console.log("textprocessor: Error fetching notes: " + err);
            }
        );
    } else if(recieved_message.match(/(all\snotes)|which\snotes/i)){
        notestore.getVerifiedNotes().then(
            value => {
                console.log(JSON.stringify(value));
                response = "Here's all the notes we have: ";
                value.forEach(item => {
                    response += item.toUpperCase() + " ";
                });
                fbapi.send(response);
            }, err => {
                console.log("Very sad: " + err);
            }
        );
    } else if(recieved_message.match(/thank\sy?o?u)/i)){
        response = "Welcome! I am always here to help you. Do you have any other things to ask me?";
    } else {
        response = "Sorry, I didn't understand you. Write me which course note you want.";
    }
    if(response){
        fbapi.send(response);
    }

};

exports.process = process;

function getCourseId(recieved_message){
    return recieved_message.match(/\w{3}\s?\d{3}/i);
};

exports.getCourseIds = function (recieved_message){
    return recieved_message.match(/\w{3}\s?\d{3}/gi);
};