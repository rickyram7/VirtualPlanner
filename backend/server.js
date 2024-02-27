const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL database configuration
const db = mysql.createConnection({
  host: 'database', 
  user: 'root',// Default root user
  password: 'hR$2Pw!9X&8sLq',
  database: 'virtual_planner',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint to fetch events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
