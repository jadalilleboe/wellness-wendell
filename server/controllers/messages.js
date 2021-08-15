// This router is for adding and updating wellness messages. The textMessages router is for sending Wellness Wendell related text messages to users.
const messagesRouter = require('express').Router()
const db = require('../database/messageQueries')

messagesRouter.get('/', db.getMessages)
messagesRouter.put('/', db.saveMessage)
messagesRouter.delete('/:id', db.deleteMessage)

module.exports = messagesRouter