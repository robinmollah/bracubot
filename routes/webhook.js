const express = require('express');
const router = express.Router();
const WebhookEnd = require("../scripts/WebhookEnd");

// Creates the endpoint for our webhook
router.post('/webhook', (req, res) => {
    let body = req.body;
    WebhookEnd(body, res);
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

module.exports = router;
