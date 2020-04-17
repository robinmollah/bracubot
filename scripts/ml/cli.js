let process = require('process');
let fs = require('fs');

let files = {
	query : 'queries.json',
	sentences: 'test_sentence.json',
	words: 'words.json',
};

let csv_files = {
	query: 'queries.csv',
	sentences: 'sentences.csv',
	words: 'words.csv'
};

let argv = process.argv.slice(2);
switch(argv[0]){
	case 'help':
		fs.readFile('wiki/help.txt', 'utf8', (err, data) => {
			console.log(data);
		});
		break;
	case 'query':
		console.log("Query");
		switch(argv[1]){
			case 'add':
				console.log("Adding queries", argv.slice(1));
				break;
			case 'get':
				console.log("Getting queries");
				break;
			case 'remove':
				console.log("Removing queries", argv.slice(1));
				break;
			default:
		}
		break;
	case 'words':
		switch(argv[1]){
			case 'add':
				console.log("Adding words", argv.slice(1));
				break;
			case 'get':
				console.log("Getting words");
				break;
			case 'remove':
				console.log("Removing words", argv.slice(1));
				break;
			default:
		}
		break;
	case 'sentence':
		switch(argv[1]){
			case 'add':
				console.log("Adding words", argv.slice(1));
				break;
			case 'get':
				console.log("Getting words");
				break;
			case 'remove':
				console.log("Removing words", argv.slice(1));
				break;
			default:
				console.log("" +
					"Add sentence\n" +
					"get\n" +
					"remove sentence");
		}
		break;
	default:
}
console.log(argv);

if(argv.length == 0){
	fs.readFile('wiki/help.txt', 'utf8', (err, data) => {
		console.log(data);
	});
}


/*
*
* query:
* 	query add
* 	query get
* 	query remove
*
* sentence:
* 	sentence add
* 	sentence get
* 	sentence remove
*
* word:
* 	word add WORD INTENT
* 	word get [INTENT]
* 	word remove
*
 */