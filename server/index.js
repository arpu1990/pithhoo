var express = require('express');
var app = express();
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = require('./config/db_config').mongoURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var user = require('./router/user.js');
var customer = require('./router/customer.js')
app.use('/user', user);
app.use('/customer', customer);

app.get('/', function (req, res) {	
   res.send('Hello World');
})

const specs = require('./swagger_doc/swagger_spec.js');
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})