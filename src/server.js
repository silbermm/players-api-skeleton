var express = require("express");
var app = express();

const models = require("./models");
const auth = require("./utils/authorization");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/user", (req, res) => {
  models.User.create(req.body)
    .then(response => {
      res.status(201);
      const new_response = { ...response, success: true };
      res.send(new_response);
    })
    .catch(err => {
      res.status(err.message);
      res.send();
    });
});

app.put("/api/user/:userId", (req, res) => {
  models.User.update(req.params.userId, req.body)
    .then(response => {
      const new_response = { ...response, success: true };
      res.send(new_response);
    })
    .catch(err => {
      res.status(err.message);
      res.send();
    });
});

app.post("/api/login", (req, res) => {
  models.User.login(req.body)
    .then(response => {
      res.status(200);
      const new_response = { ...response, success: true };
      res.send(new_response);
    })
    .catch(err => {
      res.status(err.message);
      res.send();
    });
});

app.post("/api/players", function(req, res) {
  auth.handleAuth(req, res, (token, userId) => {
    models.Player.create(req.body)
      .then(player => {
        res.status(201);
        const new_response = { player, success: true };
        res.send(new_response);
      })
      .catch(err => {
        res.status(err.message);
        res.send();
      });
  });
});

app.get("/api/players", function(req, res) {
  auth.handleAuth(req, res, (token, userId) => {
    models.Player.getAll(userId).then( (players) => {
      res.send({players, success: true})
    });
  });
});

app.delete("/api/players/:playerId", function(req, res) {
  const playerId = req.params.playerId
  auth.handleAuth(req, res, (token, userId) => {
    models.Player.removePlayer(playerId, userId).then( () => {
      res.send()
    }).catch( (err) => {
      res.status(err.message);
      res.send();
    });
  });
});

module.exports = app;
