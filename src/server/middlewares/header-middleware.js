function removeXPoweredBy () {
    return function (req, res, next) {
        res.removeHeader('x-powered-by');
        next();
    }
}

module.exports = removeXPoweredBy;
