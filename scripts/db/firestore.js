const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// let sadikRef = db.collection('users').doc('17201011');

/*
let rafiUddinSadik = sadikRef.set({
    name: 'Rafi Uddin Sadik',
    crush: 'Long overflow',
    born: 1971
});
*/


// Read data
/*
db.collection('users').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
*/

module.exports = db;