var express 				= require('express');
var router 					= express.Router();
var customer_controller 		= require('../controller/customer.js')


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     response:
 *       200:
 *         description: OK
*/

router.get('/', customer_controller.getAll);
module.exports = router;