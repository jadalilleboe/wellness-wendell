const logger = require('./logger')
const jwt = require('jsonwebtoken')
const db = require('../database/userQueries')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'token must be provided'
    })
  }
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
  
    next()
  }
  
const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.userID = decodedToken.id
  
    next()
  }

module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    errorHandler
}