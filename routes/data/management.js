let express = require('express');
let router = express.Router();

router.get('/teacher', (req, res) => {
	// TODO get the teachers info according to the provided data
	console.log(req.query);
	res.send(req);
});

router.post('/teacher', (req, res) => {
	console.log(req.body);
	// TODO add a new teacher
});

router.patch('/teacher', (req, res) => {
	console.log(req.body);
	// TODO edit a teacher's info
});

module.exports = router;