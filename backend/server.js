const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL database configuration
const db = mysql.createConnection({
  host: 'database',
  user: 'root',
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

// Middleware to parse JSON requests
app.use(express.json());

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

// Endpoint to add a new event
app.post('/events', (req, res) => {
  const { title, date, priority } = req.body;

  const newEvent = { title, date, priority };

  db.query('INSERT INTO events SET ?', newEvent, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Event added successfully');
    res.status(201).send('Event added successfully');
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
