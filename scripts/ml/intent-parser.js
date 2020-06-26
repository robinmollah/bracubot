let csv = require('./CSVParser');

function parse(sentence){
	let wordsReader = new csv.CSV('./csv/words.csv');
	wordsReader.get().then(
		(wordIntentKV) => {
			let wiKV = wordIntentKV.split("\n"); // Each lines are seperated
			// Convert [word,intent,intent_id] => [word, intent_id]
			let words = wiKV.map((value) => [value.split(',')[0], value.split(',')[2]]);
			// Convert the given sentence to lowercase
			sentence = sentence.toLowerCase();
			let wordVector = words.map((word) =>
				sentence.indexOf(word[0]) > -1 ? parseInt(word[1]) : -1
			);
			// Vectors of intent_id's -1 means no corresponding words, > -1 means a relevant match found
			console.log(wordVector);
			let queries = new csv.CSV('./csv/queries.csv');
			wordVector = wordVector.filter((value) => value != -1);
			// Load the queries and select the corresponding query
			queries.get().then(
				(queries) => {
					wordVector.forEach((value) => {
						let qKV = queries.split("\n");
						// print the corresponding one
						console.log(sentence, qKV[value]);
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