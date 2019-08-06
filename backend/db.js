const {MongoClient} = require("mongodb");

const state = {
	db: null
};

exports.connect = (url, done) => {
	if (state.db) {
		done();
	}

	MongoClient.connect(url, {useNewUrlParser: true}, (err, database) => {
		if (err) {
			done(err);
		}
		else {
			state.db = database.db("task4");
			done();
		}
	});
};

exports.get = () => state.db;
