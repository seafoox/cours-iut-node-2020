const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', {
  	title: 'contact',
  	status: req.query.status
  });
});

// /contact/send
router.post('/send', (req, res) => {
	console.log(req.body);
	res.redirect('/contact?status=sent');
});

module.exports = router;
