let express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const request = require('request');
let app = express();

app.use(bodyParser.json());

// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {
    let body = req.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            let sender_id = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_id);

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

app.get('/webhook', (req, res) => {
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
    let response;

    if(received_message.text){
        response = {
            'text' : `Recievied message: ${received_message.text}`
        };
    }

    callSendAPI(sender_id, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_id, received_postback) {

}

// Sends response messages via the Send API
function callSendAPI(sender_id, response) {
    let request_body;
    request_body = {
        'recipient': {
            'id' : sender_id
        },
        'message' : response
    };
    console.log(request_body);
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {"access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, id) => {
        if(!err){
            console.log("messages sent!");
        } else {
            console.error("Unable to send message: " + err);
        }
    });
}
module.exports = app;
