let express = require('express');
let router = express.Router();
const events = require('../scripts/dclient');

let getChannel = null;
let getMember = null;
let getSender = null;

events.on('ready', (channel, member, auth) => {
    getChannel = channel;
    getMember = member;
    getSender = auth;
});


router.post('/bot', (req, res) => {
    const channel = getChannel(req.body.channel);
    const message = req.body.message;
    const auth = req.body.auth;
    const sender = getSender(channel, auth);
    console.log(req.body);
    if(sender == null){
        res.json({status: "failed", error: "Invalid authentication."})
        return;
    }
    const tagged = req.body.users
        .map(user => user.toLowerCase())
        .map(name => getMember(name, channel))
        .map(user_obj  => `${user_obj}`)
        .join(' ');


    channel
        .send(`${sender} **:** ${message} -> ${tagged} `)
        .then(mes => {
            console.log(`Sent message: ${mes.content}`);
            res.status(200);
            res.json({
                message,
                status: 'sent'
            });
        })
        .catch(err => {
            console.error(err);
            res.json({
                message,
                status: 'error'
            });
        });
});


module.exports = router;
