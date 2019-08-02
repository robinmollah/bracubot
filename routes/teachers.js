var express = require('express');
var router = express.Router();
var teachers = require('../scripts/db/teachers');
var debug = require('debug')('bracubot:server');
let tagger = require('../scripts/tagger');
const processor = require('../scripts/textprocessor');

router.get('/teacher', function (req, res) {
    res.send("Hello teachers" + req.params);
});

router.get('/teacher/initial/:initial', function(req, res){
    teachers.getByInitial(req.params.initial, res);
});

router.get('/teacher/name/:name',function(req, res){
    teachers.getByName(req.params.name, res);
});

router.get('/teacher/test/:test', function(req, res){
    processor.test = true;
    res.send(processor.process(req.params.test));
});

module.exports = router;