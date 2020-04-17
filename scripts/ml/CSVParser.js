const fs = require('fs');

class CSV{
	constructor(file_name){
		this.file_name = file_name;
	}
	
	append(data){
		fs.appendFile(this.file_name, data, console.log);
	}
	
	delete(data){
		// search for the index of line in file and remove that line
	}
	
	get(){
		return new Promise((resolve, reject) => {
			fs.readFile(this.file_name, 'utf8', (error, data) => {
				if(error) reject(error);
				resolve(data);
			})
		});
	}
}


module.exports.CSV = CSV;