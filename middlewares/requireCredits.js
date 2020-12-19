module.exports = (req, res, next) => {
    if (req.user.credits <1) { // if user does not have more than 1 credit
        return res.status(403).send( { error: "You do not have enough credits!" }); // Terminate early via middleware
    }
    next(); // move on to the next middlewares / request handler
};