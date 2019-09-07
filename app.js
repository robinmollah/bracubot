let express = require('express');
const bodyParser = require('body-parser');
var teachers = require('./routes/teachers');
var webhooks = require('./routes/webhook');
let unit_test = require('./scripts/test/unit_test');
let app = express();
let fbapi = require('./scripts/fbapi');

app.use(bodyParser.json());
app.use(webhooks);
app.use(teachers);
app.get('/test',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/privacy_policy',function(req,res){
    res.sendFile(__dirname + '/views/privacy_policy.html');
});

app.get('/unit_test', function(req, res){
   res.send(unit_test.test());
});
module.exports = app;
