const mongoose = require('mongoose');

class MONGOClass {
	constructor() {
		this.mongoUrl = process.env.MONGO_URL;
	};

	connectDb() {
		return new Promise((resolve, reject) => {
			mongoose.connect(this.mongoUrl, { useNewUrlParser: true })
				.then(db => resolve({ db: db, url: this.mongoUrl }))
				.catch(dbErr => reject(`MongoDB not connected`, dbErr))
		});
	};
};

module.exports = MONGOClass;