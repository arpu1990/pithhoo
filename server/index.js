var express = require('express');
var app = express();
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var bodyParser = require("body-parser");

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = require('./config/db_config').mongoURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var user = require('./router/user.js');
var customer = require('./router/customer.js');
app.use('/user', user);
app.use('/customer', customer);

app.get('/', function (req, res) {	
   res.send('Hello World');
})

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader("Cache-Control", "private, no-cache, no-store");
	next();
});
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

/**
 * @swagger
 * definitions:
 *   ResponseStatus:
 *     properties: 
 *       code:
 *         type: integer
 *       success:
 *         type: object
 *       message:
 *         type: string
 *   Response:
 *     properties: 
 *       status:
 *         $ref: '#definitions/ResponseStatus'
 *       date:
 *         type: string
 *         nullable: true
*/