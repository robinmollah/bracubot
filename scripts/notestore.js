const admin = require('firebase-admin');
const os = require('os');


if(os.hostname().indexOf('RobinMollah') > -1){
let serviceAccount = require('../bracu-bot-96c1c85a031b.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
} else {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
}

const db = admin.firestore();

module.exports.getCourseLink = function(courseId){
  // TODO fetch course link
};

module.exports.getVerifiedNotes = async function(){
    var notesRef = await db.collection('verified_notes');
    var query = notesRef.where('verified','==', true).get()
        .then(snapshot => {
            let notes = [];
            if(snapshot.empty){
                console.log('No notes found. Empty!');
                return 'No notes found. Empty!';
            }
            snapshot.forEach(doc => {
                notes.push(doc.id);
            });
            return notes;
        }).catch(err => {
            console.log("Error to collect notes from server: " + err);
        });
    return query;
};