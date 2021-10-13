var mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;

const Schema_Users = new Schema({
	username 		: { type: String, require: true},
	user_phone 		: { type: String, require: true},
	},
	{
		collection	: "users",
	});

module.exports = {
	"ModelUserData" : mongoose.model('users', Schema_Users),
};