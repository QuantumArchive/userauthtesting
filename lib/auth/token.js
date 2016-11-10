const jwt = require('jsonwebtoken');
const appWeight = process.env.APP_WEIGHT || 'app-weight';

module.exports = {
    makeToken(user) {
        return new Promise((resolve, reject) => {
            //remember, we're free to define our payload and to extract what we want out of it
            //that payload effectively carries the roles as well that we'll need
            const payload = {
                user_id: user._id,
                roles: user.roles
            };
            //jwt sign takes a payload which can be a string/object/etc. a secret key, options, and a callback where you can interact with the token
            jwt.sign(payload, appWeight, null, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        });
    },
    checkToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, appWeight, (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }
};