let csv = require('./CSVParser');

function parse(sentence){
	// TODO load words
	let wordsReader = new csv.CSV('./csv/words.csv');
	wordsReader.get().then(
		(wordIntentKV) => {
			let wiKV = wordIntentKV.split("\n");
			let words = wiKV.map((value) => value.split(',')[0]);
			sentence = sentence.toLowerCase();
			let wordVector = words.map((word, index) =>
				sentence.indexOf(word) > -1 ? index+1 : -1
			); // For safety
			console.log(wordVector);
			let x = -1;
			let y = wordVector.forEach((value) => {
				if(x == -1){
					if(value > -1) x += value;
				} else {
					if(value > -1) console.error("Collision found");
				}
			});
			console.log(x);
		}
	);
	// TODO look for words
	// return the intent
}

parse("Full name of aar");