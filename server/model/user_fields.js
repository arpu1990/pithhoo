var mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;

const Schema_UserFields = new Schema({
	module_name 		: { type: String, require: true},
	account_id 			: { type: String, require: false},
	company_name 		: { type: Object, require: false},
	},
	{
		strict: false
	},
	{
		collection	: "user_fields",
	});

module.exports = {
	"ModelUserFieldsData" : mongoose.model('user_fields', Schema_UserFields),
};