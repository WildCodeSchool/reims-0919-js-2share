const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const database = require("./conf");
const bodyParser = require("body-parser");
const verifyToken = require("./verifyToken");
const myKey = require("./key");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//Enbale All CORS Requests
app.use(cors());
//

app.get("/", (req, res) => {
  res.send("Welcome to Express");
});

app.get("/families", (req, res) => {
  database.query("SELECT * from family", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des familles");
    } else {
      res.json(results);
    }
  });
});

app.get("/families/:id", (req, res) => {
  database.query(
    "SELECT * from family where id = ?",
    [req.params.id],
    (err, results) => {
      console.log(results);
      if (err) {
        res.status(500).send("Error retrieving families");
      } else {
        res.json(results);
      }
    }
  );
});

app.get("/families/:id/users", (req, res) => {
  database.query(
    "SELECT * from user_family where family_id = ?",
    [req.params.id],
    (err, results) => {
      console.log(results);
      if (err) {
        res.status(500).send("Error retrieving families");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/families/:id/users", (req, res) => {
  const formAdd = req.body;
  database.query("INSERT INTO user_family SET ?", formAdd, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new family");
    } else {
      res.status(201).send({...formAdd, id: result.insertId});
    }
  });
});

app.post("/families", (req, res) => {
  const formAdd = req.body;
  database.query("INSERT INTO family SET ?", formAdd, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new family");
    } else {
      res.status(201).send({...formAdd, id: result.insertId});
    }
  });
});

app.put("/families/:id", (req, res) => {
  const idfamily = req.params.id;
  const formData = req.body;
  database.query(
    "UPDATE family SET ? WHERE id = ?",
    [formData, idfamily],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Error editing the family");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.get("/events", (req, res) => {
  database.query("SELECT * from event", (err, results) => {
    console.log(results);
    if (err) {
      res.status(500).send("Erreur lors de la récupération des events");
    } else {
      res.json(results);
    }
  });
});

app.get("/events/:id", (req, res) => {
  database.query(
    "SELECT * from event where id = ?",
    [req.params.id],
    (err, results) => {
      console.log(results);
      if (err) {
        res.status(500).send("Error retrieving event");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/events", (req, res) => {
  const formAdd = req.body;
  database.query("INSERT INTO event SET ?", formAdd, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new event");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete("/events/:id", (req, res) => {
  const idEvent = req.params.id;
  database.query("DELETE FROM event WHERE id=?", [idEvent], err => {
    if (err) {
      res.status(500).send("Error delete Event");
    } else {
      res.sendStatus(200);
    }
  });
});

app.put("/events/:id", (req, res) => {
  const idevent = req.params.id;
  const formData = req.body;
  database.query(
    "UPDATE event SET ? WHERE id = ?",
    [formData, idevent],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Error editing the event");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.post("/register", (req, res) => {
  const formAdd = req.body;
  database.query(
    "SELECT email FROM user WHERE email = ?",
    formAdd.email,
    (err, results) => {
      if (results.length !== 0) {
        res.send("Email already in use");
      } else {
        formAdd.password = bcrypt.hashSync(formAdd.password, 10);
        insertUser();
      }
    }
  );
  const insertUser = () => {
    database.query(
      "INSERT INTO user SET ?",
      {
        firstname: formAdd.firstname,
        lastname: formAdd.lastname,
        birthdate: formAdd.birthdate,
        email: formAdd.email,
        password: formAdd.password
      },
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error registering a new user");
        } else {
          res.sendStatus(200);
          // Générer et renvoyer un token ici si on veut
        }
      }
    );
  };
});

app.post("/login", (req, res) => {
  const payload = {
    sub: req.body.email
  };
  const userInfo = req.body;
  database.query(
    "SELECT email, password from user WHERE email = ?",
    userInfo.email,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Server Error");
      } else if (results.length === 0) {
        res.send("Email invalide");
      } else {
        bcrypt.compare(userInfo.password, results[0].password, function(
          err,
          ress
        ) {
          if (ress) {
            // Passwords match
            jwt.sign(payload, myKey, (err, token) => {
              res.json({
                token
              });
            });
          } else {
            // Passwords don't match
            res.status(400).send("Mauvais mot de passe");
          }
        });
      }
    }
  );
});

// ROUTES TODO

app.get("/todos", (req, res) => {
  database.query("SELECT * from todo", (err, results) => {
    console.log(results);
    if (err) {
      res.status(500).send("Erreur lors de la récupération des todos");
    } else {
      res.json(results);
    }
  });
});

app.put("/todos/:id", (req, res) => {
  const idTodo = req.params.id;
  const formData = req.body;
  database.query("UPDATE todo SET ? WHERE id = ?", [formData, idTodo], err => {
    if (err) {
      console.log("SQL:", err.sql, "Error:", err.sqlMessage);
      res.status(500).send("Error editing the todo");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  const idTodo = req.params.id;
  database.query("DELETE FROM todo WHERE id=?", [idTodo], err => {
    if (err) {
      res.status(500).send("Error delete todo");
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/todos", (req, res) => {
  const {description, user_id, family_id} = req.body;
  const formAdd = {description, user_id, family_id};
  database.query("INSERT INTO todo SET ?", formAdd, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new todo");
    } else {
      res.status(201).send({...formAdd, id: result.insertId});
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  //ROUTES CHILDREN

app.get("/children", (req, res) => {
  database.query("SELECT * from child", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des enfants");
    } else {
      res.json(results);
    }
  });
});

app.post("/children", (req, res) => {
  const formAdd = req.body;
  database.query("INSERT INTO child SET ?", formAdd, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new child");
    } else {
      res.status(201).send({...formAdd, id: result.insertId});
    }
  });
});

  console.log(`Server is listening on ${port}`);
});
