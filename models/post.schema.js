const mongoose = require('mongoose');
const { Schema } = mongoose;

const MySchema = new Schema({
	title: String,
	content: String,
	author: {
		type: mongoose.Schema.Type.ObjectId,
		ref: 'user'
	},
	created_at: { type: Date, default: Date.now },
});

const MyModel = mongoose.model('post', MySchema);

module.exports = MyModel;