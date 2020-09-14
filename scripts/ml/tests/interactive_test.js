const readline = require('readline');

const r1 = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

r1.question("=> ", (ans) => {
	console.log("==>", ans);
});