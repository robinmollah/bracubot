let util = require('util');
let debug = require('debug')('bracubot:server');
let DB = require('./db/conn');

let askingInflater = function(tagged, reply){
    function callback(data, err){
        if(!data) throw err;
        if(!tagged.out){
            console.error('Output template is not defined.');
        }
        if(!data){
            reply("There is no record found for your query.");
            return;
        }
        if(!tagged.multi){
            if(data.length > 1){
                console.error("Multiple result found for single type query.");
            }
            data = data[0];
        } else {
            let teacher;
            let resultingData = {};
            resultingData[tagged.asking] = [];
            for(teacher in data){
                resultingData[tagged.asking].push(data[teacher][tagged.asking]);
            }
            data = data[0];
            data[tagged.asking] = resultingData[tagged.asking];
        }
        let property;
        let str = tagged.out;
        let resultingStr = str;
        for(property in data){
            let prevStr = str;
            resultingStr = resultingStr.replace("%" + property + "%", data[property]);
            if(prevStr == resultingStr) console.error('Something wrong while replacing.');
        }
        reply(resultingStr);
    };
    if(tagged.query){
        DB.query(tagged.query, [tagged.params.value], callback);
    } else {
        console.error("Query is not defined.");
        reply(tagged.out);
    }
};

module.exports.populate = function (tagged, reply) {
    debug('populating');
    askingInflater(tagged,reply);
};