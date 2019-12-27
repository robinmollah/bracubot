let express = require('express');
const bodyParser = require('body-parser');
var webhooks = require('./routes/webhook');
let unit_test = require('./scripts/test/unit_test');
let app = express();
let path = require('path');

app.use(bodyParser.json());
app.use(webhooks);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

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
