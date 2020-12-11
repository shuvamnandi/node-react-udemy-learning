const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); 
const keys = require('../config/keys');

const User = mongoose.model('users'); // Loads the schema from Mongoose

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user=>{
			done(null, user);
		})
});

passport.use( new GoogleStrategy( { 
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: "/auth/google/callback",
	proxy: true
		}, async (accessToken, refreshToken, profile, done) => {
			// These are returned by Google, containing more details about the user after successful OAuth
			console.log("***User authenticated with Google***");
			console.log("google profile returned:", profile.id);

			const existingUser = await User.findOne({ googleId: profile.id })
			if (existingUser) {
				// we already have a record with given profile ID
				console.log("User already exists in our records, good to login");
				return done(null, existingUser);
			} 
			// we don't have a record with given profile ID, create a new record
			console.log("User is new, signing up");
			const user = await new User( { googleId: profile.id, 
				googleDislayName: profile.displayname, 
				givenName: profile.name.givenName,
				familyName: profile.name.familyName}).save()
			done(null, user); // this user returned by the promise is used
		}
	)
);