var express = require('express');
var router = express.Router();
const textProcessor = require('../scripts/textprocessor');
const fbapi = require('../scripts/fbapi');

// Creates the endpoint for our webhook
router.post('/webhook', (req, res) => {
    let body = req.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];

            let sender_id = webhook_event.sender.id;
            fbapi.setSenderId(sender_id);

            if(webhook_event.message){
                handleMessage(sender_id, webhook_event.message);
            } else if(webhook_event.postback){
                handlePostback(sender_id, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});

router.get('/webhook', (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.PAGE_ACCESS_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token == VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            console.log(token + " : " + VERIFY_TOKEN);
            res.sendStatus(403);
        }
    }
});

// Handles messages events
function handleMessage(sender_id, received_message) {
    console.log("Recieved: " + received_message.text);
    if(received_message.text){
        textProcessor.process(received_message.text);
    }
}

function addUser(sender_id) {
    let FS = require('../scripts/db/firestore');
    let request = require('request');
    request('https://graph.facebook.com/' + sender_id +
        '?fields=first_name,last_name,profile_pic&access_token=' + process.env.PAGE_ACCESS_TOKEN,
        function(err, response, body){
            if(err){
                console.error("Failed to fetch user info: " + err);
                return;
            }
            let user = body;
            user["id"] = sender_id;
            user = JSON.parse(user);
            FS.collection('users').doc(sender_id).set({
                user
            }).then(null, ref => console.log("rejected to update: " + ref));
    });
}

// Handles messaging_postbacks events
function handlePostback(sender_id, received_postback) {
    if(received_postback.payload == 'get_started'){
        addUser(sender_id);
        fbapi.send("You can write \"help\" anytime to get this information.\n" +
            "\tAsk any type of questions. For instance:\n" +
            "\temail id of sli?\n" +
            "\tmail id of annajiat sir?\n" +
            "\tWho takes xxx110 course?\n" +
            "\troom number of dzk?\n" +
            "\tfull name of mih?\n" +
            "\tAs per your request other features will be added as well.");
    }
}

module.exports = router;