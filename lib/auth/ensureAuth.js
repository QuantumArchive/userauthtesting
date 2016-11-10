const tokenMod = require('./token');

//when sending a token you can salt it and then when retrieveing it, you can use a regexp to remove the salt
//but that better be a really clean regexp or you may be deleting the token too much

//the idea here is that ensureAuth will only require a token
module.exports = function ensureAuth() {
    return function(req, res, next) {
        const authHeaders = req.headers.authorization;
        
        if(!authHeaders) {
            next({
                code: 401,
                error: 'unauthorized, no token provided'
            });
        }; 

        const [bearer, jtoken] = authHeaders.split(' ');
        bearer.toLowercase();

        if(bearer !== 'bearer' || !jtoken) {
            next({
                code: 401,
                error: 'invalid token, you may want to check that the word Bearer is separated by the actual token with a space'
            });
        };

        tokenMod
            .checkToken(jtoken)
            .then(payload => {
                req.user = payload;
                //does this make it so the response will have this information on it?
                //it looks like the response actually has user id and roles on it because of the payload
                next();
            })
            .catch(err => {
                return next({
                    code: 403,
                    error: 'unauthorized, invalid token'
                });
            });
    };
};