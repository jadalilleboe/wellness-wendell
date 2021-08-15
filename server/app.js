const express = require('express')
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const textMessagesRouter = require('./controllers/textMessages')
const messagesRouter = require('./controllers/messages')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/text-messages', textMessagesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/messages', middleware.userExtractor, messagesRouter)

app.use(middleware.errorHandler)

module.exports = app