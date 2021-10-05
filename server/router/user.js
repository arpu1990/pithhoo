var express 				= require('express');
var router 					= express.Router();
var user_controller 		= require('../controller/user.js')


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

router.get('/', user_controller.getAll);
module.exports = router;