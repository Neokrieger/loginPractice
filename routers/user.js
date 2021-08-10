const express = require('express')
const router = express.Router( { mergeParams: true } )

const authenticator = (req, res, next) => {
  if (!req.session.userId) {
    res.render('login', {
  		error : res.locals.errors[2]
  	});
  } else {
    next()
  }
}

router.get('/', (req, res) => {
    res.render('user');
});

router.get(`/:id`,authenticator, async (req, res) => {
	res.render('user');
})

router.post(`/`, (req,res) => {
  delete req.session.userId;
  res.redirect('/login');
})

// router.post('/', async (req, res) =>{

// })

module.exports = router;
