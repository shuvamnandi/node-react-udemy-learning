const express = require('express'); // Get access to express using CommonJS modules
// import express from 'express'; // NodeJS does not have support for ES2015 modules, supported in React
const app = express(); // We can have multiple apps like this

app.get('/', (req, res) => {		// Route Handler 1
	res.send({ hi: 'there'});
});


app.get('/hey', (req, res) => {		// Route Handler 2
	res.send({ hey: 'there babe'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);  // Telling node to listen on PORT for traffic, accessed via http://localhost:5000
