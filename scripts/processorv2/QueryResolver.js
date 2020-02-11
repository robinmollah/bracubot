let queries = [
    {intent: 'room',
    course_code: 'cse111',
    section: 1},
    {intent: 'room',
    initial: 'aar'},
    {intent: 'name',
    initial: 'dzk'},
];

for(let query of queries){
    console.log("Query: " + JSON.stringify(query));
}

/*
Which collection(s) contains the answer
 */
function getCollection(){

}