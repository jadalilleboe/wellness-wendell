const config = require('../utils/config')
const textMessagesRouter = require('express').Router()
const client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN)

textMessagesRouter.post('/', (request, response) => {
    const receiver = request.body.number
    response.header('Content-Type', 'application/json')
    const code = Math.floor(1000 + Math.random() * 9000)
    client.messages.create({
        from: config.TWILIO_PHONE_NUMBER,
        to: receiver, 
        body: `Your Wellness Wendell Code is ${code.toString()}`
    })
    .then(() => {
        response.send(JSON.stringify({ success: true, code: code}))
    })
    .catch(() => {
        response.send(JSON.stringify({ success: false}))
    })
})

module.exports = textMessagesRouter