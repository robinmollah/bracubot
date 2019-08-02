let express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const fbapi = require('./scripts/fbapi');
const textProcessor = require('./scripts/textprocessor');
var teachers = require('./routes/teachers');
var webhooks = require('./routes/webhook');
let app = express();

app.use(bodyParser.json());
app.use(webhooks);
app.use(teachers);

module.exports = app;
