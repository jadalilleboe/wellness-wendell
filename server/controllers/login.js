const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const db = require('../database/loginQueries')

loginRouter.post('/', db.login)

module.exports = loginRouter