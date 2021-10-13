var express 				= require('express');
var router 					= express.Router();
var customer_controller     = require('../controller/customer.js')


/**
 * @swagger
 * /customer/add/{account_id}:
 *   get:
 *     tags: 
 *       - customers
 *     produces: 
 *       - application/json
 *     parameters: 
 *       - in: path
 *         name: account_id
 *         schema:
 *           type: string
 *           require: true
 *           description: account id
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: An Array of run instance 
 *         schema: 
 *           $ref: '#definitions/Response'
 *   post:
 *     tags: 
 *       - customers
 *     consumes: 
 *       - application/json
 *     produces: 
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: account_id
 *         schema:
 *           type: string
 *           require: true
 *           description: account id 
 *       - in: body
 *         name: user
 *         schema:
 *           type: object
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: An Array of run instance 
 *         schema: 
 *           $ref: '#definitions/Response'
 *  
 * /customer/edit/{account_id}/{customer_id}:
 *   get:
 *     tags: 
 *       - customers
 *     produces: 
 *       - application/json
 *     parameters: 
 *       - in: path
 *         name: account_id
 *         schema:
 *           type: string
 *           require: true
 *           description: account id
 *       - in: path
 *         name: customer_id
 *         schema:
 *           type: string
 *           require: true
 *           description: customer id
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: An Array of run instance 
 *         schema: 
 *           $ref: '#definitions/Response'
 *   post:
 *     tags: 
 *       - customers
 *     consumes: 
 *       - application/json
 *     produces: 
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: account_id
 *         schema:
 *           type: string
 *           require: true
 *           description: account id
 *       - in: path
 *         name: customer_id
 *         schema:
 *           type: string
 *           require: true
 *           description: customer id 
 *       - in: body
 *         name: user
 *         schema:
 *           type: object
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: An Array of run instance 
 *         schema: 
 *           $ref: '#definitions/Response'
 *          
 * /customer/search/{account_id}/{query}:
 *   get:
 *     tags: 
 *       - customers
 *     produces: 
 *       - application/json
 *     parameters: 
 *       - in: path
 *         name: account_id
 *         schema:
 *           type: string
 *           require: true
 *           description: account id
 *       - in: path
 *         name: query
 *         schema:
 *           type: string
 *           require: true
 *           example: 'customer_id=all&from=2021-09-01&to=2021-09-01'
 *           description: query
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: An Array of run instance 
 *         schema: 
 *           $ref: '#definitions/Response'

*/

router.get('/add/:account_id', customer_controller.getCustomerFields);
router.post('/add/:account_id', customer_controller.addCustomer);
router.get('/edit/:account_id/:customer_id', customer_controller.getCustomerDetail);
router.post('/edit/:account_id/:customer_id', customer_controller.updateCustomerDetail);
router.post('/search/:account_id/:customer_id', customer_controller.searchCustomers);
module.exports = router;