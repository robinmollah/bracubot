let fs = require('fs');

let sentences = [
	"room number of aar",
	"full name of aar",
	"who is aar",
	"initial of annajiat sir",
	"courses taken by aar"
];

let words = [
	{
		word: 'room number',
		intent: 'room_number',
	},
	{
		word: 'full name',
		intent: 'name'
	},
	{
		word: 'initial',
		intent: 'initial'
	}
];

let queries = [
	{
		intent: 'room_number',
		answer: 'room number of ' + ' is ' + 'UBxxxxx'
	},
	{
		intent: 'name',
		answer: 'full name of aar is annajiat alim rasel'
	},
	{
		intent: 'initial',
		answer: 'Initial of Annajiat Alim Rasel sir is AAR'
	}
];

let out = fs.readFile('test_sentences.json', (err) => {
	console.log(err);
});

console.log(out);

//
// fs.readFile('words.json', JSON.stringify(words), (err) => {
// 	console.log(err);
// });
//
// fs.readFile('queries.json', JSON.stringify(queries), (err) => {
// 	console.log(err);
// });