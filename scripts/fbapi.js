let senderId = 0;
const request = require('request');

module.exports.getSenderId = function(){
    return senderId;
};
module.exports.setSenderId = function(senderid){
    senderId = senderid;
};

module.exports.send = function(response){
    let request_body;
    request_body = {
        'recipient': {
            'id' : senderId
        },
        'message' : { 'text' : response }
    };
    console.log(request_body);
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {"access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, id) => {
        if(!err){
            console.log("messages sent! " + res);
        } else {
            console.error("Unable to send message: " + err);
        }
    });
};

let profile = function(json_body){
    request({
        "uri":"https://graph.facebook.com/v2.6/me/messenger_profile",
        "qs": {"access_token": process.env.PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": json_body
    }, (err,res,id) => {
        if(!err) console.log("Profile has been updated!");
        else console.log("Failed to update profile." + err);
    });
};

module.exports.profile = profile;

module.exports.setGetStarted = function (postBackName) {
    let request_body = {
        "get_started": {"payload": "get_started"}
    };
    profile(request_body);
};

module.exports.setGreetings = function(greetings){
    let request_body = {
        "greeting": [
            {
                "locale": "default",
                "text": "All your answers simply on here"
            }
        ]
    };
    profile(request_body);
};

module.exports.setPersistentMenu = function(){
    let jsonbody = {
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Help",
                        "payload": "get_started"
                    },
                    {
                        "type": "postback",
                        "title": "About us",
                        "payload": "about_us"
                    },
                    {
                        "type": "postbakck",
                        "title": "Terms of use",
                        "payload": "terms"
                    }
                ]
            }
        ]
    };
    profile(jsonbody);
};