const express = require('express'); // Get access to express using CommonJS modules
// import express from 'express'; // NodeJS does not have support for ES2015 modules, supported in React

require('./services/passport');

const app = express(); // We can have multiple apps like this

require('./routes/authRoutes')(app); // Call the arrow function inside module.exports using app

const PORT = process.env.PORT || 5000; // To support Heroku deployment, Env variable set by Heroku
app.listen(PORT);  // Telling node to listen on PORT for traffic, accessed via http://localhost:5000
