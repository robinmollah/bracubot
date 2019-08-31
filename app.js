let express = require('express');
const bodyParser = require('body-parser');
var teachers = require('./routes/teachers');
var webhooks = require('./routes/webhook');
let app = express();

app.use(bodyParser.json());
app.use(webhooks);
app.use(teachers);
app.get('/test',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

module.exports = app;
