function shenanigansMiddleware () {
    return function (req, res, next) {
        res.setHeader('X-Shenanigans', 'None');
        next();
    };
}

module.exports = shenanigansMiddleware;
