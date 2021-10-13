var express 				= require('express');
var router 					= express.Router();
var user_controller 		= require('../controller/user.js')


/**
 * @swagger
 * /user:
 *   get:
 *     tags: 
 *       - user 
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: An Array of run instance 
 *         schema: 
 *           $ref: '#definitions/Response'
*/

router.get('/', user_controller.getAll);
module.exports = router;