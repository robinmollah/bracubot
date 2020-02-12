let queries = [
    {intent: 'room',
        params: [{course_code: 'cse111'},
            {section: 1}]
    },
    {intent: 'room',
        params: [{initial: 'aar'}]
    }
];

for(let query of queries){
    console.log("Query: " + JSON.stringify(query));
}

/*
Which collection(s) contains the answer
 */
function getCollection(){

}

function getTemplate(){
    
}