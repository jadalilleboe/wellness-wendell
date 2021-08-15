const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('./dbConnection.js')

const login = async (request, response) => {
    const body = request.body
    const checkIfExists = await pool.query('SELECT exists (SELECT 1 FROM users WHERE email = $1)', [body.email])
    const userExists = checkIfExists.rows[0]['exists']

    const user = await pool
        .query('SELECT * FROM users WHERE email = $1', [body.email])
    const passwordHash = user.rows[0].passwordhash
    
    const passwordCorrect = (userExists)
        ? await bcrypt.compare(body.password, passwordHash)
        : false

    if(!(userExists && passwordCorrect)) {
        return response.status(401).json({
          error: 'invalid email or password'
        })
      }

    const userForToken = {
        email: user.rows[0].email,
        id: user.rows[0].userid,
      }
    
    const token = jwt.sign(
        userForToken, 
        process.env.SECRET,
        { expiresIn: 60*60 }
      )
    
    response
      .status(200)
      .send({ token, email: user.rows[0].email, name: user.rows[0].firstname + ' ' + user.rows[0].lastname })
}

module.exports = {
    login
}