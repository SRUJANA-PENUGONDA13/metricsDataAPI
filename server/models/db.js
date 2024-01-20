// models/db.js
const { Pool } = require('pg')

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres',
  host: 'database-metrics.c5o8uscasykf.eu-north-1.rds.amazonaws.com',
  database: 'metricsData',
  password: 'Admin1234567',
  port: '5432',
})

pool
  .connect()
  .then(() => {
    console.log('Connected to the database successfully!')
  })
  .catch((error) => console.log('Error in connecting', error))

// // Function to query the database
// const query = async (text, params) => {
//   const start = Date.now()

//   try {
//     const result = await client.query(text, params)
//     const duration = Date.now() - start
//     console.log('Executed query', { text, duration, rows: result.rowCount })
//     return result
//   } finally {
//     client.release()
//   }
// }

module.exports = {
  db: pool,
}
