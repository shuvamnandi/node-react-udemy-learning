const passport = require('passport');

const googleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

passport.use( new googleStrategy( { 
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: "/auth/google/callback"
		}, (accessToken, refreshToken, profile, done) => {
			// These are returned by Google, containing more details about the user after successful OAuth
			console.log("accessToken provided:", accessToken);
			console.log("refreshToken provided:", refreshToken);
			console.log("profile provided:", profile);
			console.log("done:", done);
		}
	)
);