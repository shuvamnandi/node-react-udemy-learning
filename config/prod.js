// prod.js - Set in Heroku App Settings Config Variables
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: process.env.MONGO_URI,
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
	stripeSecretKey: process.env.STRIPE_SECRET_KEY,
	sendGridKey: process.env.SEND_GRID_KEY,
	emailFrom: process.env.EMAIL_FROM,
	redirectDomain: process.env.REDIRECT_DOMAIN
};