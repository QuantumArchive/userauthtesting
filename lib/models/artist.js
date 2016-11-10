const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String
    },
    DOB: {
        type: Date
    },
    nationality: {
        type: String
    },
    works: []
});

module.exports = mongoose.model('Artists', schema);