const mongoose = require('mongoose');
const { Schema } = mongoose;

const MySchema = new Schema({
    pseudo: { unique: true, type: String },
    email: { unique: true, type: String },
    password: String,
    created_at: { type: Date, default: Date.now },
});

const MyModel = mongoose.model('user', MySchema);
module.exports = MyModel;