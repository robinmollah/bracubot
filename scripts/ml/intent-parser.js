let csv = require('./CSVParser');

function parse(sentence){
	// TODO load words
	let wordsReader = new csv.CSV('./csv/words.csv');
	wordsReader.get().then(
		(wordIntentKV) => {
			let wiKV = wordIntentKV.split("\n");
			let words = wiKV.map((value) => [value.split(',')[0], value.split(',')[2]]);
			sentence = sentence.toLowerCase();
			console.log(words);
			let wordVector = words.map((word) =>
				sentence.indexOf(word[0]) > -1 ? parseInt(word[1]) : -1
			);
			console.log(wordVector);
			let queries = new csv.CSV('./csv/queries.csv');
			wordVector = wordVector.filter((value) => value != -1);
			queries.get().then(
				(queries) => {
					wordVector.forEach((value) => {
						let qKV = queries.split("\n");
						console.log(qKV[value]);
					});
				}
			);
			
		}
	);
	// TODO look for words
	// return the intent
}

parse("Full name of aar");
parse("hellooooo");
parse("who is aar");
parse("Room number of aar");
parse("aar's room number");