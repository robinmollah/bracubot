let GrandParser = require('./GrandParser');

let sentence = "room number of cse111 section 1";
let GParser = new GrandParser();

/*
Example parseResult:
[
    {intent: 'room'},
    {course_code: 'cse111'},
    {section: 1}
]
 */
console.log("Building query for: " + sentence);
let parseResult = [];
for(let word of sentence){
    parseResult.push(GParser.parse(word));
}

function toQuery(){
    // TODO convert the parseResult to query
    /*
    Example Query:
    {intent: 'room',
     params: [{course_code: 'cse111'},
            {section: 1}]
    }
     */
}