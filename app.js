const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const session = require('express-session')
const { Login, Userinfo } = require('./models');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const loginRouter = require('./routers/login')
const registerRouter = require('./routers/register')
const userRouter = require('./routers/user')
const commentsRouter = require('./routers/comments')

app.use(expressLayouts);
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
    res.locals.currentUser = await Login.findOne({
      where: {
        id: req.session.userId
      }
    })
  } else {
    res.locals.currentUser = undefined
  }
  res.locals.errors = ["", "Username/Password is incorrect", "You are not signed in"]
  next()
})

app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/register', registerRouter)
app.use('/comments', commentsRouter)


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
