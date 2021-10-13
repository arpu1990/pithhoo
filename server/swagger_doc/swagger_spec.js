const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
	definitions : {
	  openapi: "3.0.0",
	  info: {
	  	swagger: "2.0",
	    title: 'Application',
	    version: '1.0.0',
	  },
	},
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
  		'./router/*.js', 
  		'./index.js'
  		],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;