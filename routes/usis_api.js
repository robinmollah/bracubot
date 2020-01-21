let express = require('express');
let router = express.Router();
const firestore = require('../scripts/db/firestore');

router.post("/teacher/initial", (req, res) => {
    let initial = req.body.initial;
    console.log("initial: " + initial);
    if(!initial){
        console.log("initial is not provied");
        res.json({status: "failed", reason: "Initial is not provied."});
        return;
    }
    let collection = firestore.collection("teachers");
    collection.where("initial", "==", initial).get()
        .then(snapshot => {
            if(snapshot.empty){
                console.log("No matching faculty");
                res.json({status: "failed", reason: "No matching faculty"});
                return;
            }
            if(snapshot.size > 1){
                console.log("WARNING: More than one faculty same initial");
            }
            snapshot.forEach((item) => {
                console.log(item.id + " : " + JSON.stringify(item.data()));
                res.json(item.data());
                return;
            });
            return;
        }).catch( err => {
            console.log("Failed to fetch doc from db. " + err);
            res.json({status: "failed", reason: "Failed to access db >" + err});
        });
});

module.exports = router;