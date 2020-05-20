const mongoose = require('mongoose');
const { Schema } = mongoose;

const MySchema = new Schema({
  content: String,
  post: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'post'
  },
  created_at: { type: Date, default: Date.now }
});

const MyModel = mongoose.model('comment', MySchema);

module.exports = MyModel;