const {ObjectID} = require("mongodb");
const db = require("../db");

exports.all = (callback) => {
	db.get().collection("companies").find().toArray((err, docs) => {
		callback(err, docs);
	});
};

exports.findById = (id, callback) => {
	db.get().collection("companies").findOne({_id: ObjectID(id)}, (err, doc) => {
		callback(err, doc);
	});
};

exports.create = (company, callback) => {
	db.get().collection("companies").insert(company, (err, result) => {
		callback(err, result);
	});
};

exports.update = (id, newData, callback) => {
	db.get().collection("companies").updateOne(
		{_id: ObjectID(id)},
		{
			$set: newData
		},
		(err, result) => {
			callback(err, result);
		}
	);
};

exports.delete = (id, callback) => {
	db.get().collection("companies").deleteOne(
		{_id: ObjectID(id)},
		(err, result) => {
			callback(err, result);
		}
	);
};
