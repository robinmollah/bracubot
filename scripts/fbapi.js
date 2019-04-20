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
            console.log("messages sent!");
        } else {
            console.error("Unable to send message: " + err);
        }
    });
};