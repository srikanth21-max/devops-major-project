const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
const port = 5000;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'mydb',
  port: 5432,
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.get('/api/time', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});