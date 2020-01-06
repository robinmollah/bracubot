var FS = require('./db/firestore');

// insertFailcase("Email id of THD", "NI");

function insertFailcase(sentence, category) {
    let COLLECTION = FS.collection('failcases');
    COLLECTION.add({
        query : sentence,
        type: category
    }).then(ref => console.log('Added failcase: ' + ref.id));
}

module.exports.insertFailcase = insertFailcase;