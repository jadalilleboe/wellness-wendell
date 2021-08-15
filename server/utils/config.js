require('dotenv').config()

const PORT = process.env.PORT
const PGDB_PASSWORD = process.env.PGDB_PASSWORD
const DATABASE_URL = process.env.DATABASE_URL
const ACCOUNT_SID = process.env.ACCOUNT_SID
const AUTH_TOKEN =  process.env.AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

module.exports = {
    PORT,
    PGDB_PASSWORD,
    ACCOUNT_SID,
    AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    DATABASE_URL
}