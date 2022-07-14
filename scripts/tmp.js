const fb_db = require('./db/firestore');

fb_db.collection("users").get().then(function(data){
    console.log(data);
    data.forEach(function(doc){
        console.log("data", doc.data());
    });
}).catch(function(err){
    console.log(err);
});