
var MongoClient		= require('mongodb').MongoClient;
const dbString  	= require('../config/db_config').mongoURL;
const dataDB    	= require('../config/db_config').dataDB;

var db;
MongoClient.connect(dbString, {
	useNewUrlParser : true,
	useUnifiedTopology: true,
}, function(err, client) {
	if(err) return console.error(err);
	db = client.db(dataDB)
});


const ModelUserDataWrapper 		= require("../model/user");
const ModelUserData 			= ModelUserDataWrapper.ModelUserData;


exports.getAll = function(req, res) {
	ModelUserData.find({username: "asusai"}, function(err, docs) {
		if(!err) {
			res.send({"data":docs})
		} else {
			res.send("Something went wrong")
		}
	});
	
};