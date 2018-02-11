// Creating a Local Server with Express.js

var express = require('express'),

  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/Model/toDoListModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('../toDo/api/Router/toDoListRouter'); //importing route
routes(app); //register the route


app.listen(port);

// Log to the Console that server is Running. 
console.log('todo list RESTful API server started on: ' + port);


// Middleware for giving meanful message when failed to fetch in the Response.
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});