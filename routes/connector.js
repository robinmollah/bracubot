var express = require('express');
var router = express.Router();
let DBPromise = require('../scripts/db/conn-promise.js');

router .get('/bracu/connector', (req, res) => {
    // TODO you should query the database from here then pass it to the second param of the below method
    // It will be available in the pug file, use 'each' function of pug
    res.render('teacher_connector.pug', {title: "Mail connector"});
});

router .get('/bracu/failcase/analytics', (req, res) => {
    res.render('failcaseAnalytics.pug');
});

router .get('/bracu/failcase/queries', (req, res) => {
    DBPromise.query('SELECT query FROM failcases WHERE type="NP"', null).then(
        (data) => {
            let sentence = "";
            Object.keys(data).forEach(function (key, i) {
                sentence = sentence + data[i].query + " ";
            });
            let w = sentence.split(/[ .?!,*'"]/);
            var words = w.map(v => v.toLowerCase());
            var freq = words.reduce(function(p, c) {
                p[c] = (p[c] || 0) + 1;
                return p;
            }, {});
            var result = Object.keys(freq).map(function(key) {
                return { word: key, size: freq[key] };
            });
            res.send(result);
        }
    ).catch((e) => {
        console.error(e);
    });
});

module.exports = router;