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
	res.render('login');
});

app.post('/logins', async (req, res) => {
    await Login.create({
        username : req.body.username,
        password : req.body.password
    })
    res.redirect('/login')
});

app.get('/register', async (req, res) => {
	res.render('register');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

