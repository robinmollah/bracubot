var express = require('express');
var router = express.Router();

router .get('/bracu/connector', (req, res) => {
    // TODO you should query the database from here then pass it to the second param of the below method
    // It will be available in the pug file, use 'each' function of pug
    res.render('teacher_connector.pug', {title: "Mail connector"});
});


module.exports = router;