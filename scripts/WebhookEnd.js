const textProcessor = require('../scripts/textprocessor');
const fbapi = require('../scripts/fbapi');

function WebhookEnd(body, res){
	if (body.object === 'page') {
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
		res.status(200).send('EVENT_RECEIVED');
	} else {
		body.entry.forEach(function(entry) {
			console.log("entry", entry);
			let webhook_event = entry.messaging[0];
			console.log("webhook_event", webhook_event);
			let sender_id = null;
			// fbapi.setSenderId(sender_id);

			if(webhook_event.message){
				handleMessage(sender_id, webhook_event.message);
			} else if(webhook_event.postback){
				handlePostback(sender_id, webhook_event.postback);
			}
		});
		res.status(200).send('EVENT_RECEIVED');
	}
}


function handleMessage(sender_id, received_message) {
	console.log("Received: " + received_message.text);
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
			}).then(success => {
				console.log("User added in Firebase", success);
			}).catch(err => {
				console.error("Error", err);
			});
		});
}

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


module.exports = WebhookEnd;
