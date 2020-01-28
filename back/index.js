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

app.get("/families", verifyToken, (req, res) => {
  jwt.verify(req.token, myKey, (err, authData) => {
    if (err) {
      res.sendStatus(401);
    } else {
      database.query(
        "SELECT family.id, family.name FROM user_family JOIN family ON user_family.family_id=family.id WHERE user_family.email=?",
        authData.sub,
        (err, results) => {
          if (err) {
            res.status(500).send("Erreur lors de la récupération des familles");
          } else {
            res.json(results);
          }
        }
      );
    }
  });
});

app.get("/families/:id", (req, res) => {
  database.query(
    "SELECT * from family where id = ?",
    [req.params.id],
    (err, results) => {
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
      if (err) {
        res.status(500).send("Error retrieving families");
      } else {
        res.json(results);
      }
    }
  );
});

app.post("/families/:id/users", verifyToken, (req, res) => {
  jwt.verify(req.token, myKey, (err, authData) => {
    if (err) {
      res.status(401);
    } else {
      database.query(
        "INSERT INTO user_family SET?",
        authData,
        (err, result) => {}
      );
    }
  });
  const formAdd = req.body;
  database.query("INSERT INTO user_family SET ?", formAdd, (err, result) => {
    if (err) {
      res.status(500).send("Error saving a new family");
    } else {
      res.status(201).send({ ...formAdd, id: result.insertId });
    }
  });
});

app.post("/families", verifyToken, (req, res) => {
  const formAdd = req.body;
  jwt.verify(req.token, myKey, (err, authData) => {
    if (err) {
      res.status(401);
    } else {
      database.query("INSERT INTO family SET ?", formAdd, (err, result) => {
        if (err) {
          res.status(500).send("Error saving a new family");
        } else {
          const familyId = result.insertId;
          database.query(
            "INSERT INTO user_family SET ?",
            { email: authData.sub, family_id: familyId },
            (err, result) => {
              if (err) {
                res.status(500).send("Error saving first member family");
              } else {
                res.status(201).send({ ...formAdd, id: familyId });
              }
            }
          );
        }
      });
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

app.delete("/families/:id/users", (req, res) => {
  const email = req.body.email;
  const idFamily = req.params.id
  console.log(email)
  database.query("DELETE FROM user_family WHERE email=? AND family_id=?", [email, idFamily], (err, results) => {
    if (err) {
      res.status(500).send("Error delete member");
    } else {

      res.send(results)
    }
  });
});


app.get("/events", (req, res) => {
  const familyId = req.query.filter;
  if(familyId > 0) {
    database.query(
      "SELECT * from event where family_id = ?",
      familyId,
      (err, result) => {
        console.log("query:", familyId);
        console.log(result);
        if (err) {
          res.status(500).send("Erreur lors de la récupération des events");
        } else {
          res.json(result);
        }
      }
    )
  } else {
    database.query("SELECT * from event", (err, results) => {
      if (err) {
        res.status(500)
      } else {
        res.json(results)
      }
    })
  }
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
      res.status(201).send({...formAdd, id : results.insertId});
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

app.get("/todos", verifyToken, (req, res) => {
  jwt.sign(req.token, myKey, (err, authData) => {
    if (err) {
      res.send(401);
    } else {
      database.query("SELECT * from todo", (err, results) => {
        console.log(results);
        if (err) {
          res.status(500).send("Erreur lors de la récupération des todos");
        } else {
          res.json(results);
        }
      });
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
  const { description, user_id, family_id } = req.body;
  const formAdd = { description, user_id, family_id };
  database.query("INSERT INTO todo SET ?", formAdd, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving a new todo");
    } else {
      res.status(201).send({ ...formAdd, id: result.insertId });
    }
  });
});

//ROUTES CHILDREN

app.get("/children", verifyToken, (req, res) => {
  jwt.verify(req.token, myKey, (err, authData) => {
    console.log("authData:", authData);
    if (err) {
      res.send(401);
    } else {
      database.query(
        "SELECT child.firstname, child.id FROM child JOIN family ON child.family_id=family.id WHERE family_id=?",
        req.headers["id"],
        (err, results) => {
          console.log("err:", err);
          console.log("results:", results);
          if (err) {
            res.status(500).send("Erreur lors de la récupération des enfants");
          } else {
            res.json(results);
          }
        }
      );
    }
  });
});

app.post("/children", verifyToken, (req, res) => {
  jwt.verify(req.token, myKey, (err, authData) => {
    if (err) {
      res.send(401);
    } else {
      const formAdd = req.body;
      database.query("INSERT INTO child SET ?", formAdd, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error saving a new child");
        } else {
          res.status(201).send({ ...formAdd, id: result.insertId });
        }
      });
    }
  });
});

app.delete("/children/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, myKey, (err, authData) => {
    if (err) {
      res.send(401);
    } else {
      const idChild = req.params.id;
      database.query("DELETE FROM child WHERE id=?", [idChild], err => {
        if (err) {
          res.status(500).send("Error delete child");
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
