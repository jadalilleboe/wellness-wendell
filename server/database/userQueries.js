const pool = require('./dbConnection.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const createUser = async (request, response) => {
  const { firstName, lastName, email, password, phoneNumber } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const userUUID = String(uuidv4())
  const messageUUID = String(uuidv4())

  await pool.query('INSERT INTO users (UserId, FirstName, LastName, Email, PasswordHash, PhoneNumber) VALUES ($1, $2, $3, $4, $5, $6)', [userUUID, firstName, lastName, email, passwordHash, phoneNumber])
  
  response.status(201).send('User added')
}

const getUser = async (id) => {
  const user = await pool.query('SELECT * FROM Users WHERE UserId = $1', [id])
  return user.rows[0]
}

const updatePhoneNumber = async (request, response) => {
  const userID = request.userID

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

  await pool.query('UPDATE users SET phonenumber = $1 WHERE userid = $2', [request.body.newNumber, userID])

  response.status(201).send('Phone number updated')
}

const deleteUser = async (request, response) => {
  const userID = request.userID

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

  await pool.query('DELETE FROM users WHERE userid = $1', [userID])

  response.status(201).send('User deleted')
}

const verifyUniqueEmail = async (request, response) => {
  const email = request.body.thisemail

  const checkIfExists = await pool.query('SELECT exists(SELECT 1 FROM users WHERE email = $1)', [email])

  response.send(checkIfExists.rows[0].exists)
}

module.exports = {
  createUser,
  getUser,
  updatePhoneNumber,
  deleteUser,
  verifyUniqueEmail
}