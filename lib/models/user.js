const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: []
});

schema.methods.makeHashbrowns = function(password) {
    return this.password = bcrypt.hashSync(password, 8);
};

schema.methods.compareHashbrowns = function(hash) {
    return bcrypt.compareSync(hash, this.password);
};

module.exports = mongoose.model('Users', schema);