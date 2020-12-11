const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
    // n number of middlewares can be passed to a request handler
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // happening in the requireLogin middleware
        // if (!req.user) {
        //     return res.status(401).send( { error: "You must log in!" });
        // }
        const charge = await stripe.charges.create( {
            amount: 500,
            currency: 'sgd',
            description: "SGD 5 for 5 credits",
            source: req.body.id
        });
        req.user.credits += 5; // req.user made available via passport middleware
        console.log("No. of credits now: ", req.user.credits);
        const user = await req.user.save();
        console.log("User credits updated on server: ", user.credits);
        res.send(user);
    });
}