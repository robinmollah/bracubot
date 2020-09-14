const parse = require("../intent-parser");
const csv = require("../CSVParser");

let test_data = new csv.CSV('../test_data/tests.csv');
test_data.get().then((res) => {
	const lines = res.split("\r\n");
	let result = {
		correct_answer: 0,
		wrong_answer: 0
	};
	for(let line of lines){
		line = line.split(",");
		const question = line[0];
		const answer = line[1];
		parse(question, (ans) => {
			console.log(ans);
		});
	}
});
// parse("My name is robin");
// parse("Full name of aar");