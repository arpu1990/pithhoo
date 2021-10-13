
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


const ModelCustomerDataWrapper 		= require("../model/customer");
const ModelCustomerUserData 		= ModelCustomerDataWrapper.ModelCustomerUserData;
const ModelUserFieldsWrapper 		= require("../model/user_fields");
const ModelUserFieldsData 			= ModelUserFieldsWrapper.ModelUserFieldsData;
const Res_Base						= require("../utils/BASE_RES");
const MetaDataFieldsWrapper 		= require("../model/metadata");
const ModelMetaData 				= MetaDataFieldsWrapper.ModelMetaData;



exports.getCustomerFields = function(req, res) {
	var account_id = req.params.account_id;
	console.log("account_id:", account_id)
	ModelUserFieldsData.findOne({account_id: account_id, module_name: "customer"}, function(err, user_fields) {
		if(!err) {
			let user_fields_doc = JSON.parse(JSON.stringify(user_fields));
			ModelMetaData.findOne({"doc_type": "field_validations"}, function(err, metadata){
				let metadata_doc = JSON.parse(JSON.stringify(metadata));
				console.log(metadata_doc)
				Object.keys(user_fields_doc).map(function(m){
					if (typeof user_fields_doc[m] == "object"){
						if ('field_validation' in user_fields_doc[m]){
							console.log(user_fields_doc[m]["field_validation"], user_fields_doc[m]["field_validation"] in metadata_doc)
							if (user_fields_doc[m]["field_validation"] in metadata_doc){
								user_fields_doc[m]["validation"] = metadata_doc[user_fields_doc[m]["field_validation"]]
							}

						}
					} 
				})

				let dto_response = Res_Base.resp_base;
				dto_response.data = user_fields_doc;
				res.send(dto_response);

			})
			
		} else {
			res.send("Something went wrong")
		}
	});
};

exports.addCustomer = function(req, res) {
	var account_id = req.params.account_id;
	//find customer already exists 

	let customer_details  = req.body;
	ModelCustomerUserData.find({account_id: account_id, "customer_name": customer_details["customer_name"]}, function(err, docs) {
		if(!err) {
			if (docs.length > 0 ){
				res.send("User already exists")
			} else {
				async function start() {
					const customer = await ModelCustomerUserData();

					// user_fields updating the unique field starts 

					const user_fields = await ModelUserFieldsData.findOne({account_id: account_id, module_name: "customer"});
					let user_fields_doc = JSON.parse(JSON.stringify(user_fields));
					Object.keys(user_fields_doc).map(function(m){
						if (m in customer_details) {
							if (typeof user_fields_doc[m] == "object") {
								if ('unique_value' in user_fields_doc[m]) {
									user_fields_doc[m]['unique_value'].push(customer_details[m]) 
									user_fields_doc[m]['unique_value'] = [...new Set(user_fields_doc[m]['unique_value'])]
								}
							}
							
						}
					});
					user_fields.overwrite(user_fields_doc);
					await user_fields.save(function(err){
						console.log(err)
					});
					// user_fields updating the unique field starts 


					customer.overwrite(customer_details);
					customer.save();
				}
				start();
				let dto_response = Res_Base.resp_base;
				dto_response.data = "User added successfully";
				res.send(dto_response);
			}
			
		}
	})

};


exports.getCustomerDetail = function(req, res) {
	var account_id = req.params.account_id;
	var customer_id = req.params.customer_id;
	ModelCustomerUserData.find({account_id: account_id, _id: customer_id}, function(err, docs) {
		if(!err) {
			let dto_response = Res_Base.resp_base;
			dto_response.data = docs;
			res.send(dto_response);
		} else {
			res.send("Something went wrong")
		}
	});
};


exports.updateCustomerDetail = function(req, res) {
	let account_id = req.params.account_id;
	let customer_id = req.params.customer_id;
	//const customer_details  = req.body;
	let customer_details  = req.body;
	async function start() {
		//customer_find and update start  

		const customer = await ModelCustomerUserData.findOne({_id : customer_id, account_id: account_id});
		customer.overwrite(customer_details);
		await customer.save(function(err){
			console.log(err)
		});
		//customer_find and update ends

		// user_fields updating the unique field starts 

		const user_fields = await ModelUserFieldsData.findOne({account_id: account_id, module_name: "customer"});
		let user_fields_doc = JSON.parse(JSON.stringify(user_fields));
		Object.keys(user_fields_doc).map(function(m){
			if (m in customer_details) {
				if (typeof user_fields_doc[m] == "object") {
					if ('unique_value' in user_fields_doc[m]) {
						user_fields_doc[m]['unique_value'].push(customer_details[m]) 
						user_fields_doc[m]['unique_value'] = [...new Set(user_fields_doc[m]['unique_value'])]
					}
				}
				
			}
		});
		user_fields.overwrite(user_fields_doc);
		await user_fields.save(function(err){
			console.log(err)
		});
		// user_fields updating the unique field starts 

		let dto_response = Res_Base.resp_base;
		dto_response.data = "Updated successfully";
		res.send(dto_response);
	}
	start();
};


exports.searchCustomers = function(req, res) {
	var account_id = req.params.account_id;
	var query = req.params.query;
	ModelCustomerUserData.find({account_id: account_id}, function(err, docs) {
		if(!err) {
			let dto_response = Res_Base.resp_base;
			dto_response.data = docs;
			res.send(dto_response);
		} else {
			res.send("Something went wrong")
		}
	});
};

