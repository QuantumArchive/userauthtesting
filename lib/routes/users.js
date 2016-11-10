const mongoose = require('mongoose');
const router = mongoose.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const tokenMod = require('../auth/token');
const ensureAuth = require('../auth/ensureAuth')();
const ensureRole = require('../auth/ensureRole');

router
    .post('/validate', ensureAuth, bodyParser, (req, res, next) => {
        res.send({valid: true});
    })

    .post('/signup', bodyParser, (req, res, next) => {
        const {username, password} = req.body;
        delete req.body.password; //oddly enough on the response I can still see this...
        let userId = '';

        if (!username || !password) {
            return next({
                code: 400,
                error: 'username and password are required'
            });
        };
        
        //There doesn't seem to be an easy way to see if someone added to their roles here...
        User
            .find({username})
            .count()
            .then(count => {
                if (count >= 1) throw {code: 400, error: `username ${username} already exists`};
                const user = new User(req.body);
                user.makeHashbrowns(password);
                return user.save();
            })
            .then(user => {
                userId = user._id;
                return tokenMod.makeToken(user);
            })
            .then(token => {
                res.send({token: token, user_id: userId});
            })
            .catch(next)
    })

    .post('/signin', bodyParser, (req, res, next) => {
        const {username, password} = req.body;
        delete req.body.password;
        let userId = '';

        if (!username || !password) {
            return next({
                code: 400,
                error: 'username and password are required'
            });
        };

        User
            .findOne({username})
            .then(user => {
                if(!user || !user.compareHashbrowns(password)) {
                    throw {code: 400, error: 'invalid username or password'};
                };
                return tokenMod.makeToken(user);
            })
            .then(token => {
                userId += user._id;
                res.send({token: token, user_id: userId});
            })
            .catch(next)
    })

    .delete('/:id', ensureAuth, ensureRole(['admin']),bodyParser, (req, res, next) => {
        User
            .findByIdAndRemove(req.params.id)
            .then(user => res.send(user))
            .catch(next);
    });

module.exports = router;