const path = require("path");
const {existsSync, mkdirSync, readdirSync} = require("fs");

exports.all = (req, res) => {
	let files = [];
	const testFolder = "./static/files";
	readdirSync(testFolder).forEach((folder) => {
		readdirSync(`${testFolder}/${folder}`).forEach((file) => {
			files.push({
				Name: file,
				contactId: folder,
				urlPuth: `${req.protocol}://${req.get("host")}/static/files/${folder}/${file}`
			});
		});
	});
	res.status(200).send(files);
};

exports.upload = (req, res) => {
	if (Object.keys(req.files).length === 0) {
		return res.status(400).send({status: "No files were uploaded"});
	}

	const imgFile = req.files.imgFile;

	const localPuth = "static/photo";
	if (!existsSync(`./${localPuth}`)) {
		mkdirSync(`./${localPuth}`);
	}

	const urlPuth = `${req.protocol}://${req.get("host")}/${localPuth}/`;
	const filePuth = path.resolve(`./${localPuth}`);
	imgFile.mv(`${filePuth}/${imgFile.name
		.toLowerCase()
		.split(" ")
		.join("_")}/`,
	(err) => {
		if (err) return res.status(500).send({status: "error"});
		return res.status(200).send({urlPuth: `${urlPuth}${imgFile.name
			.toLowerCase()
			.split(" ")
			.join("_")}`});
	});
};

exports.uploadAll = (req, res) => {
	if (Object.keys(req.files).length === 0) {
		return res.status(400).send({status: "No files were uploaded"});
	}

	const files = req.files.files;

	const localPuth = `static/files/${req.params.id}`;
	if (!existsSync(`./${localPuth}`)) {
		mkdirSync(`./${localPuth}`);
	}

	const urlPuth = `${req.protocol}://${req.get("host")}/${localPuth}`;
	const filePuth = path.resolve(`./${localPuth}`);
	files.mv(`${filePuth}/${files.name.toLowerCase()
		.split(" ")
		.join("_")}/`,
	(err) => {
		if (err) return res.status(500).send({status: "error"});
		return res.status(200).send({urlPuth: `${urlPuth}/${files.name
			.toLowerCase()
			.split(" ")
			.join("_")}`});
	});
};
