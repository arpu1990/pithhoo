
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
const Res_Base					= require("../utils/BASE_RES");

exports.getAll = function(req, res) {
	ModelUserData.find({username: "asusai"}, function(err, docs) {
		if(!err) {
			let dto_response = Res_Base.resp_base;
			dto_response.data = docs;
			res.send(dto_response);
		} else {
			res.send("Something went wrong");
		}
	});
	
};