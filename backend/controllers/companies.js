const Companies = require("../models/companies");

exports.all = (req, res) => {
	Companies.all((err, docs) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			docs.forEach((item) => {
				item.id = item._id;
				delete item._id;
			});
			res.status(200).send(docs);
		}
	});
};

exports.findById = (req, res) => {
	Companies.findById(req.params.id, (err, doc) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			doc.id = doc._id;
			delete doc._id;
			res.status(200).send(doc);
		}
	});
};

exports.create = (req, res) => {
	let company = {
		value: req.body.value,
		Address: req.body.Address,
		Skype: req.body.Skype,
		Phone: req.body.Phone,
		Email: req.body.Email
	};
	Companies.create(company, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			company.id = company._id;
			delete company._id;
			res.status(200).send(company);
		}
	});
};

exports.update = (req, res) => {
	Companies.update(req.params.id, {
		value: req.body.value,
		Address: req.body.Address,
		Skype: req.body.Skype,
		Phone: req.body.Phone,
		Email: req.body.Email
	}, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			res.status(200).send();
		}
	});
};

exports.delete = (req, res) => {
	Companies.delete(req.params.id, (err, result) => {
		if (err) {
			console.log(err);
			res.status(500).send({status: "error"});
		}
		else {
			res.status(200).send();
		}
	});
};
