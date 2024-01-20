// app.js
const express = require('express');
const bodyParser = require('body-parser');
const expressionsRouter = require('./routes/expressions');
const db = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// PostgreSQL connection settings
const pool = new Pool({
  user: 'postgres-username',
  host: 'postgres-host',
  database: 'postgres-database',
  password: 'postgres-password',
  port: 5432, // Default PostgreSQL port
});

// Connect to PostgreSQL database
pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
    return;
  }
  console.log('Connected to PostgreSQL database');
});

// Use expressions router
app.use('/api', expressionsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
