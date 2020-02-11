let GrandParser = require('./GrandParser');

let sentence = "Who is AAR?";
let GParser = new GrandParser();

/*
Example parseResult:
[
    {intent: 'room'},
    {course_code: 'cse111'},
    {section: 1}
]
 */
let parseResult = [];
for(let word of sentence){
    parseResult.push(GParser.parse(word));
}

function toQuery(){
    // TODO convert the this.parseResult to query
    /*
    Example Query:
    {intent: 'room',
     course_code: 'cse111',
     section: 1}
     */
}