var mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;

const Schema_Customer = new Schema({
	customer_name 			: { type: String, require: true},
	customer_number 		: { type: String, require: false},
	account_id 				: { type: String, require: false},
	city 					: { type: String, require: false},
	},
	{
		strict: false
	},
	{
		collection	: "customer_details",
	}
	);

module.exports = {
	"ModelCustomerUserData" : mongoose.model('customer_details', Schema_Customer),
};