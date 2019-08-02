let express = require('express');
const bodyParser = require('body-parser');
var teachers = require('./routes/teachers');
var webhooks = require('./routes/webhook');
let app = express();

app.use(bodyParser.json());
app.use(webhooks);
app.use(teachers);

module.exports = app;
