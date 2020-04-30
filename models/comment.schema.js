/*
Import
*/
    const mongoose = require('mongoose');
    const { Schema } = mongoose;
//


/*
Definition
*/
    const MySchema = new Schema({
        content: String,
        subject: String,
        author: String
    });
//

/*
Export
*/
    const MyModel = mongoose.model('comment', MySchema);
    module.exports = MyModel;
//