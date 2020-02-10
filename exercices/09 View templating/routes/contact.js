const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', {
  	title: 'Contact',
  	status: req.query.status
  });
});

// /contact/send
router.post('/send', (req, res) => {
	console.log(req.body);
	res.redirect('/contact?status=sent');
});

module.exports = router;
