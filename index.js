const express = require('express'); // Get access to express using CommonJS modules
// import express from 'express'; // NodeJS does not have support for ES2015 modules, supported in React
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);

require('./models/User');
require('./services/passport');

const app = express(); // We can have multiple apps like this

app.use(bodyParser.json());

app.use(
	cookieSession( {
		maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // Call the arrow function inside module.exports using app
require('./routes/paymentRoutes')(app); // Call the arrow function inside module.exports using app

const PORT = process.env.PORT || 5000; // To support Heroku deployment, Env variable set by Heroku
app.listen(PORT);  // Telling node to listen on PORT for traffic, accessed via http://localhost:5000
