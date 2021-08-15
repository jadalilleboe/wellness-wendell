const config = require('../utils/config')

const Pool = require('pg').Pool
const pool = process.env.NODE_ENV === 'production' 
? new Pool({
  connectionString: config.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}) 
: new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ww_test',
  password: config.PGDB_PASSWORD,
  port: 5432
})


module.exports = pool