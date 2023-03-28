const { Pool } = require('pg');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// Set up a connection pool
const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'gW5CxxszTf56A5vXB',
  port: 5432,
});

app.use(cors());

app.use(bodyParser.json()); // parse application/json requests
// Define a route
app.post('/', async (req, res) => {
  try {
    console.log(req.body.address);
    await client.query('INSERT INTO bridge_addresses (address) VALUES ($1)', [req.body.address]);
    const message = "request complete";
    res.send(message);
  } catch (err) {
    console.error(err);
    res.send('Error occurred');
  }
});

app.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM bridge_addresses');
          const message = result.rows[0].message;
          console.log(message);
          console.log(result);
          res.send(message);
    } catch (err) {
      console.error(err);
      res.send('Error occurred');
    }
  });

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

