var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./src/routes/index')
var usersRouter = require('./src/routes/users')
var rainRouter = require('./src/routes/rain')
var gaugeRouter = require('./src/routes/gauge')

const db = require('./src/db')

const app = express()
const cors = require('cors')

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/rain', rainRouter)
app.use('/api/gauge', gaugeRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

db.connect()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
