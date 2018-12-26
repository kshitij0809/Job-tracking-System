/* eslint no-use-before-define:0 */
/* eslint no-restricted-globals:0 */
/* eslint no-console:0 */
require('babel-register')({
    presets: [ 'env' ]
})

// import { errorMail } from './app/mailers'
import { isTest, env, isProd } from './app/utils/env'

const debug = require('debug')('init:server')
const http = require('http')
const cors = require('cors')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

// Require .env file
require('dotenv').config()

console.log("HERE")

const models = require('./app/models')

const utils = require('./app/utils/env')

const app = express()

// Enable cors
app.use(cors({
  origin: utils.allowedDomains(),
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
}))

// Enable helmet
app.use(helmet())

app.use(compression())

// TODO: Use cluster

const port = normalizePort(process.env.PORT)
app.set('port', port)

const server = http.createServer(app)

// sync() will create all table if they doesn't exist in database
if (!isTest) {
  models.sequelize.sync().then(() => {
    server.listen(port, 'localhost')
    server.on('error', onError)
    server.on('listening', onListening)
  })
}

// view engine setup
app.set('views', path.join(__dirname, './app/views'))
app.set('view engine', 'ejs')

// app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// Robots.txt
app.get(
  '/robots.txt',
  (req, res) => {
    res.sendFile(path.join(`${__dirname}/robots.txt`))
  },
)

// humans.txt
app.get(
  '/humans.txt',
  (req, res) => {
    res.sendFile(path.join(`${__dirname}/humans.txt`))
  },
)

app.use('/api', require('./routes'))
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Invalid Route')
  err.status = 404
  err.message = 'Invalid Route'
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  if (isProd) {
    errorMail(process.env.ADMIN_MAIL, err)
  } else {
    console.log(err)
  }

  res.status(err.status || 500).json({ message: err.message || 'Something Went Wrong.' })
})

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const p = parseInt(val, 10)

  if (isNaN(p)) {
    // named pipe
    return val
  }

  if (p >= 0) {
    // port number
    return p
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
  console.log(env)
}

module.exports = app
