const express = require('express'); // Get access to express using CommonJS modules
// import express from 'express'; // NodeJS does not have support for ES2015 modules, supported in React
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

mongoose.connect(keys.mongoURI);

require('./models/User');
require('./models/Survey');
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
require('./routes/surveyRoutes')(app); // Call the arrow function inside module.exports using app

if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));

	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000; // To support Heroku deployment, Env variable set by Heroku
app.listen(PORT);  // Telling node to listen on PORT for traffic, accessed via http://localhost:5000
