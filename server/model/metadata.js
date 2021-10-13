var mongoose 			= require('mongoose');
const Schema 			= mongoose.Schema;

const Schema_Metadata = new Schema({
	},
	{
		collection	: "metadata",
	}
	);

module.exports = {
	"ModelMetaData" : mongoose.model('metadata', Schema_Metadata),
};