const usersRouter = require('express').Router()
const db = require('../database/userQueries')
const middleware = require('../utils/middleware')

usersRouter.post('/', db.createUser)
usersRouter.put('/', middleware.userExtractor, db.updatePhoneNumber)
usersRouter.delete('/', middleware.userExtractor, db.deleteUser)
usersRouter.post('/verify', db.verifyUniqueEmail)

module.exports = usersRouter