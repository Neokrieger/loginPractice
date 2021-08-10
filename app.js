const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const session = require('express-session')
const { Login, Userinfo } = require('./models');
const methodOverride = require('method-override');

const loginRouter = require('./routers/login')
const registerRouter = require('./routers/register')
const userRouter = require('./routers/user')

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: true }))
app.use(session({
  secret: 'super top secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.currentUser = await User.findOne({
      where: {
        id: req.session.userId
      }
    })
  } else {
    res.locals.currentUser = undefined
  }
  res.locals.errors = []
  next()
})

app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/register', registerRouter)


// app.get('/login', async (req, res) => {
// 	res.render('login', {
// 		error: ""
// 	});
// });

// app.post('/login', async (req, res) =>{

// })

// app.post('/registered', async (req, res) => {
//     await Login.create({
//         username : req.body.username,
//         password : req.body.password
//     })
//     res.redirect('/login')
// });




// app.post('/login/error', async (req, res) => {
// 	const user = await Login.findOne({
// 		where: {
// 			username: req.body.username
// 		}
// 	})

// 	if (user && bcrypt.compareSync(req.body.password,user.password)){
// 		res.redirect(`/user/${login.id}`)
// 	} else {
// 	res.render(`login`, {
// 		error: "Username/Password is incorrect"
// 	});
// 	}

// });

app.get(`/user/:id`, async (req, res) => {

	res.render('user');
})


app.get('/register', async (req, res) => {
	res.render('register');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
