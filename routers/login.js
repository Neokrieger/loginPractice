const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
	res.render('login', {
		error : ''
	});
});

router.post('/login/error', async (req, res) => {
	const user = await Login.findOne({
		where : {
			username : req.body.username
		}
	});

	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		res.redirect(`/user/${login.id}`);
	} else {
		res.render(`login`, {
			error : 'Username/Password is incorrect'
		});
	}
});

module.exports = router;
