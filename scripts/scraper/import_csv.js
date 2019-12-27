const csv = require('csv-parser');
const fs = require('fs');
const firestore = require('../db/firestore');

fs.createReadStream('messengerbot_p')
    .pipe(csv())
    .on('data', row => {
        let ref =  firestore.collection('patterns').doc(row.id);
        delete row.id;
        for(let key in row){
            if(!row[key]){
                delete row[key];
            }
        }
        ref.set(row).then(res => console.log("written: " + res),
                err => console.log("failed: " + err));
    })
    .on('end', () => console.log('CSV file successfully processed'));