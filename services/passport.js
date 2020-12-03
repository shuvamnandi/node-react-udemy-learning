const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); 
const keys = require('../config/keys');

const User = mongoose.model('users'); // Loads the schema from Mongoose

passport.use( new GoogleStrategy( { 
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: "/auth/google/callback"
		}, (accessToken, refreshToken, profile, done) => {
			// These are returned by Google, containing more details about the user after successful OAuth
			console.log("***User authenticated with Google***");
			console.log("accessToken:", accessToken);
			console.log("google profile returned:", profile.id);

			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// we already have a record with given profile ID
					console.log("User already exists in our records, good to login");
					done(null, existingUser);
				} else {
					// we don't have a record with given profile ID, create a new record
					console.log("User is new, signing up");
					new User({googleId: profile.id, 
						googleDislayName: profile.displayname, 
						givenName: profile.name.givenName,
						familyName: profile.name.familyName})
						.save()
						.then(user=>done(null, user)); // this user returned by the promise is used
				}
			});
		}
	)
);