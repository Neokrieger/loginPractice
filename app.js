const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { Login, Userinfo } = require('./models');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: true }))

app.get('/login', async (req, res) => {
	res.render('login', {
		error: ""
	});
});

app.post('/login', async (req, res) =>{

})

app.post('/registered', async (req, res) => {
    await Login.create({
        username : req.body.username,
        password : req.body.password
    })
    res.redirect('/login')
});

app.post('/login/error', async (req, res) => {

	const logins = await Login.findAll({})

	logins.forEach(login => {
		if(login.username === req.body.username && login.password === req.body.password){
			res.redirect(`/user/${login.id}`)
		}
	})

	  res.render(`login`, {
			error: "Username/Password is incorrect"
		});
});

app.get(`/user/:id`, async (req, res) => {

	res.render('user');
})


app.get('/register', async (req, res) => {
	res.render('register');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
