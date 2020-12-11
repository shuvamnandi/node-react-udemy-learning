module.exports = (req, res, next) => {
    if (!req.user) { // if user is not logged in, i.e. req.user is not setup via Passport
        return res.status(401).send( { error: "You must log in!" }); // Terminate early via middleware
    }
    next(); // move on to the next middlewares / request handler
};