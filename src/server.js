var express = require('express')
var app = express()

var models = require('./models')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/user', (req, res) => {
  models.User.create(req.body).then( (response) => {
    res.status(201)
    const new_response = { ...response, success: true }
    res.send(new_response)
  }).catch((err) => {
    res.status(err.message)
    res.send()
  });
});

app.put('/api/user/:userId', (req, res) => {
  models.User.update(req.params.userId, req.body).then( (response) => {
    const new_response = { ...response, success: true }
    res.send(new_response)
  }).catch( (err) => {
    res.status(err.message)
    res.send()
  });
});

app.post('/api/login', (req, res) => {
  models.User.login(req.body).then( (response) => {
    res.status(200)
    const new_response = { ...response, success: true }
    res.send(new_response)
  }).catch( (err) => {
    res.status(err.message)
    res.send()
  });
});

app.post('/api/players', function(req, res) {
  res.status(403)
  res.send()
});

module.exports = app;
