const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname+"/test.html"));
});

module.exports = router;
