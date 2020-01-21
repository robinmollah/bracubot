let express = require('express');
const bodyParser = require('body-parser');
let webhooks = require('./routes/webhook');
let api = require('./routes/botapi');
let usisApi = require('./routes/usis_api');
let unit_test = require('./scripts/test/unit_test');
let connector = require('./routes/connector');
let app = express();
let path = require('path');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(webhooks);

app.use(usisApi);
app.use(api);
app.use(connector);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/test',function(req,res) {
    res.render('test.pug',{page : 'Hi', menuId: 4});
});

app.post('/test', function (req, res) {
    let lab = require('./scripts/test/lab');
    let body = req.body;
    console.log('Body: ' + JSON.stringify(body));
    lab.process(body.message, res);
});

app.get('/',function(req, res){
    require('./scripts/db/firestore');
    res.render('index.pug',{page : 'Hi', menuId: 4});
});

app.get('/privacy_policy',function(req,res){
    res.sendFile(__dirname + '/views/privacy_policy.html');
});

app.get('/unit_test', function(req, res){
   res.send(unit_test.test());
});


module.exports = app;
