// keys.js - figure out what set of credentials to return

// handled by Heroku
if (process.env.NODE_ENV === 'production') {
	// we are in production environment - retrn prod set of keys
	module.exports = require('./prod');
} else {
	// we are in development environment - retrn dev set of keys
	module.exports = require('./dev');
}
