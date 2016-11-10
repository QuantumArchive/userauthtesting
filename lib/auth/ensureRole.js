module.exports = function(roles) {
    const lookup = roles.reduce((lookup, role) => {
        lookup[role] = true;
        return lookup;
    }, Object.create(null));

    return function(req, res, next) {
        const userInfo = req.user.roles;
        if (userInfo && userInfo.some(roles => lookup[roles])) {
            next();
        } else {
            next({
                code: 401,
                error: 'not authorized'
            });
        };
    };
};