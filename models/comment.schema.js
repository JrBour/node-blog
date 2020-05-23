const mongoose = require('mongoose');
const { Schema } = mongoose;

const MySchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  created_at: { type: Date, default: Date.now }
});

const MyModel = mongoose.model('comment', MySchema);

module.exports = MyModel;