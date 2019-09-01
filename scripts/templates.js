let util = require('util');
let debug = require('debug')('bracubot:server');
let DB = require('./db/conn');

let askingInflater = function(pattern, values, reply){
    function callback(data, err){
        if(!data) throw err;
        if(!pattern.template){
            console.error('Output template is not defined.');
        }
        if(!data){
            reply("There is no record found for your query.");
            return;
        }
        if(!pattern.multi){
            if(data.length > 1){
                console.log(data);
                console.error("Multiple result found for single type query.");
            }
            data = data[0];
        } else {
            let teacher;
            let resultingData = {};
            resultingData[pattern.asking] = [];
            for(teacher in data){
                resultingData[pattern.asking].push(data[teacher][pattern.asking]);
            }
            data = data[0];
            data[pattern.asking] = resultingData[pattern.asking];
        }
        let property;
        let str = pattern.template;
        let resultingStr = str;
        for(property in data){
            let prevStr = str;
            resultingStr = resultingStr.replace("%" + property + "%", data[property]);
            if(prevStr == resultingStr) console.error('Something wrong while replacing.');
        }
        reply(resultingStr);
    };
    if(pattern.query){
        values = values + "";
        DB.query(pattern.query, values.split(","), callback);
    } else {
        console.log(pattern);
        console.error("Query is not defined.");
        reply(pattern.template);
    }
};

module.exports.populate = function (tagged, values, reply) {
    askingInflater(tagged, values ,reply);
};