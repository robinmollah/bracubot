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

module.exports.getCourseLink = async function(courseId){
    console.log(courseId);
  var query = await db.collection('verified_notes').doc(courseId).get()
      .then(snapshot => {
          let snap = snapshot.data();
          if(snap){
              if(snap.verified){
                  return "Sure. Here is the link of " + snap.name + " course: " + snap.link;
              } else {
                  return "The note is not yet verified by admin. It will be verified very soon. " + snap.link;
              }
          } else {
              return "We don't have the note of this subject yet. Do you want to submit yours?";
          }
      }, err => {
        console.log("notestore: Error fetching notes: " + err);
      });
  return query;
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