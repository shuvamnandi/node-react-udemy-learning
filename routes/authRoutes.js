const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google/', 
		// 'google' is an internal identifier present within GoogleStrategy to know what to authenticate using
		passport.authenticate('google', { 
			// scope specifies what access we want to have from Google
			scope: [ 'profile', 'email' ]
		})
	);

	// Uses the code provided by Google to get more details about the user after successful OAuth, available inside callbackURL's => function
	app.get(
		'/auth/google/callback', 
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys/');
		}
	);

	app.get('/api/logout', (req, res)=>{
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};