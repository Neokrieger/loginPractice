const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router({ mergeParams: true });
const { Login } = require('../models');

router.get('/', (req, res) => {
	res.render('register');
});

router.post('/new', async (req, res) => {
	const user = await Login.create({
		username : req.body.username,
		password : bcrypt.hashSync(req.body.password)
	});
	res.redirect('/login');
});

module.exports = router;
