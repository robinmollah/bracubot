const notestore = require('./notestore');
const fbapi = require('./fbapi');

var process = function (recieved_message){
    var response;
    var courseId = getCourseId(recieved_message);
    if(courseId){
        var course_link = notestore.getCourseLink(courseId);
        courseId = String(courseId).toUpperCase();
        response = `I dont have ${courseId} course note`;
        response += " " + course_link;
        fbapi.send(response);
    } else if(recieved_message.match(/all\snotes/i)){
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
    } else {
        response = `recieved: ${recieved_message}`;
    }
    return response;
};

exports.process = process;

function getCourseId(recieved_message){
    return recieved_message.match(/\w{3}\s?\d{3}/i);
};

exports.getCourseIds = function (recieved_message){
    return recieved_message.match(/\w{3}\s?\d{3}/gi);
};