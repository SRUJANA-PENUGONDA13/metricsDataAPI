// models/db.js
const { Pool } = require('pg');

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres-username',
  host: 'postgres-host',
  database: 'postgres-database',
  password: 'postgres-password',
  port: 5432, // Default PostgreSQL port
});

// Function to query the database
const query = async (text, params) => {
  const start = Date.now();
  const client = await pool.connect();

  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
};
