let FS = require('./db/firestore');

// insertFailcase("Email id of THD", "NI");
// getFailcases();

function insertFailcase(sentence, category) {
    let COLLECTION = FS.collection('failcases');
    COLLECTION.add({
        query : sentence,
        type: category
    }).then(ref => console.log('Added failcase: ' + ref.id));
}

function getFailcases(){
    FS.collection('failcases').get()
        .then(snapshot => {
            snapshot.forEach(doc => console.log("Data ", doc.data()));
        })
        .catch(err => console.log("error fetching patterns: " + err));
}

module.exports.insertFailcase = insertFailcase;