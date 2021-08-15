const pool = require('./dbConnection.js')
const jwt = require('jsonwebtoken')

const getMessages = async (request, response) => {
    const userID = request.userID

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const res = await pool.query('SELECT * FROM messages WHERE UserID = $1', [userID])
    const messages = res.rows.map(message => { return ( {'message': message.message, 'messageid': message.messageid, 'timeDisplayHours': message.timedisplayhours, 'timeDisplayMinutes': message.timedisplayminutes, 'timeOfDay': message.timeofday} ) })
    response.json(messages)
}

const saveMessage = async (request, response) => {
    const body = request.body

    const checkIfExists = await pool.query('SELECT exists(SELECT 1 FROM messages WHERE messageid = $1)', [body.messageid])

    if (checkIfExists.rows[0].exists) {
        const res = await pool.query('UPDATE messages SET message = $1, UTCHours = $2, UTCMinutes = $3, timeDisplayHours = $4, timeDisplayMinutes = $5, timeOfDay = $6 WHERE messageid = $7', [body.message, body.UTCHours, body.UTCMinutes, body.timeDisplayHours, body.timeDisplayMinutes, body.timeOfDay, body.messageid])

        response.json({"message": "message has been successfully saved"})
    } else {
        const res = await pool.query('INSERT INTO messages (UserId, MessageId, Message, UTCHours, UTCMinutes, timeDisplayHours, timeDisplayMinutes, timeOfDay) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [request.userID, body.messageid, body.message, body.UTCHours, body.UTCMinutes, body.timeDisplayHours, body.timeDisplayMinutes, body.timeOfDay])
    }
}

const deleteMessage = async (request, response) => {
    const id = request.params.id
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const res = await pool.query('DELETE FROM messages WHERE messageid = $1', [id])

    response.json({"message": "message has been successfully deleted"})
}

module.exports = {
    getMessages,
    saveMessage,
    deleteMessage
}