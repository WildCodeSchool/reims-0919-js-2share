const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;
const database = require('./conf');
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.get('/families/:id', (req, res) => {
  database.query('SELECT * from family where id = ?', [req.params.id], (err, results) => {
   console.log(results)
    if (err) {
     res.status(500).send('Error retrieving families');
   } else {
     res.json(results);
   }
 });
})

app.post('/families', (req, res) => {
  const formAdd = req.body;
  database.query('INSERT INTO family SET ?', formAdd, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new family");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put('/families/:id', (req, res) => {
  const idfamily = req.params.id;
  const formData = req.body;
    database.query('UPDATE family SET ? WHERE id = ?', [formData, idfamily], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Error editing the family");
    } else {
      res.sendStatus(200);
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
  console.log(formAdd)
  database.query('INSERT INTO event SET ?', formAdd, (err, results) => {
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
      res.status(500).send("Error editing the event");
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/register', (req, res) => {
  const formData = req.body;
  if (formData.email && formData.password) {
    console.log('email', formData.email, 'password', formData.password);
    res.status(200).send();
  }
  else {
    res.status(400).send();
  }
});

app.post('/login', (req, res) => {
  const formLogin = req.body;
  if (formLogin.user && formLogin.password) {
    console.log('user', formLogin.user, 'password', formLogin.password);
    res.status(200).send();
  }
  else {
    res.status(400).send();
  }
});

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});