const express = require('express');
const mysql = require('mysql2');

const app = express();

// MySQL database configuration
const dbConfig = {
  host: 'VirtualPlannerDatabase',
  user: 'root',
  password: 'password',
  database: 'virtual_planner',
};

// Function to connect to the database with retry
function connectWithRetry(dbConfig, maxAttempts = 5, attempt = 1) {
  const db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error(`Error connecting to MySQL database: ${err}`);
      
      if (attempt < maxAttempts) {
        console.log(`Attempting to reconnect to the database... Attempt ${attempt} of ${maxAttempts}`);
        
        // Wait for 5 seconds before retrying
        setTimeout(() => connectWithRetry(dbConfig, maxAttempts, attempt + 1), 5000);
      } else {
        console.error('Failed to connect to the database after several attempts.');
      }
      
      return;
    }

    console.log('Connected to MySQL database');
  });

  // Handle database errors after initial connection
  db.on('error', err => {
    console.error('Database error', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Re-connecting lost database connection...');
      connectWithRetry(dbConfig);
    }
  });
}

// Initiate connection
connectWithRetry(dbConfig);

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

// add the tables to the database
db.query(`
  CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    priority INT NOT NULL
  )
`, (err, result) => {
  if (err) {
    console.error('Error creating MySQL table:', err);
    return;
  }
  console.log('Table created successfully');
});
