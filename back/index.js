const express = require('express');
const app = express();
const port = 8000;
const database = require('./conf');


app.get('/', (req, res) => {
  res.send('Welcome to Express')
})


app.get('/families', (req, res) => {
  database.query('SELECT * from family', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des familles');
    } else {
      res.json(results);
    }
  });
});


app.get('/events', (req, res) => {
  database.query('SELECT * from event', (err, results) => {
    console.log(results)
    if (err) {
      res.status(500).send('Erreur lors de la récupération des events');
    } else {
      res.json(results);
    }
  });
});


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});