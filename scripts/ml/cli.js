let process = require('process');
let fs = require('fs');
const CSV = require('./CSVParser.js');

let files = {
	query : 'queries.json',
	sentences: 'test_sentence.json',
	words: 'words.json',
};

let csv_files = {
	query: 'csv/queries.csv',
	sentences: 'csv/sentences.csv',
	words: 'csv/words.csv'
};

let argv = process.argv.slice(2);
let parser;
switch(argv[0]){
	case 'help':
		fs.readFile('wiki/help.txt', 'utf8', (err, data) => {
			console.log(data);
		});
		break;
	case 'query':
		parser = new CSV.CSV(csv_files.query);
		console.log("Query");
		switch(argv[1]){
			case 'add':
				console.log("Adding queries", argv.slice(1));
				break;
			case 'get':
				parser.get(argv[2]).then(console.log);
				break;
			case 'remove':
				console.log("Removing queries", argv.slice(1));
				break;
			default:
		}
		break;
	case 'words':
		 parser = new CSV.CSV(csv_files.words);
		
		switch(argv[1]){
			case 'add':
				parser.append(argv.slice(2));
				break;
			case 'get':
				parser.get(argv[2]).then(console.log);
				break;
			case 'remove':
				console.log("Removing words", argv.slice(1));
				break;
			default:
		}
		break;
	case 'sentence':
		parser = new CSV.CSV(csv_files.sentences);
		
		switch(argv[1]){
			case 'add':
				parser.append(argv[2]);
				break;
			case 'get':
				parser.get(argv[2]).then(console.log);
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