let SS = require('../special_search');

function test(){
    console.log(SS.day("today"));
    return SS.day("tomorrow").toString();
}

function assert(func, result){
    if(func == result){
        return "Test successful";
    }
}

module.exports.test = test;