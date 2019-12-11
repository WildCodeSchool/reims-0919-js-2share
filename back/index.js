const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;
const database = require('./conf');

//Enbale All CORS Requests
app.use(cors())
//


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

app.get('/events/:id', (req, res) => {
  database.query('SELECT * from event where id = ?', [req.params.id], (err, results) => {
   console.log(results)
    if (err) {
     res.status(500).send('Error retrieving event');
   } else {
     res.json(results);
   }
 });
})

app.post('/events', (req, res) => {
  const formAdd = req.body;
  database.query('INSERT INTO event (date_start, date_end) VALUES (?)', formAdd, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new event");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/events/:id', (req, res) => {
  const idevent = req.params.id;
  const formData = req.body;
    database.query('UPDATE event SET ? WHERE id = ?', [formData, idevent], err => {
    if (err) {
      console.log(err);
      response.status(500).send("Error editing the event");
    } else {
      response.sendStatus(200);
    }
  });
});


app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});