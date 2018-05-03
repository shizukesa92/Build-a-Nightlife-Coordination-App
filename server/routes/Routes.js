const AuthenticationOperations = require('../controllers/Authentication');
const APIOperations = require('../controllers/Operations');

const passportService = require('../util/passport');
const passport = require('passport');

const express = require('express');

const requireAuth = passport.authenticate('jwt', {
	session: false
});
const requireSignin = passport.authenticate('local', {
	session: false
});
const optionalAuth = function(req, res, next) {
	passport.authenticate('jwt', {
		session: false
	}, function(err, user, info) {
		if (err)
			return next(err);

		req.user = user; // user data gets sent. lack of authentication means user is set to false
		next();
	})(req, res, next);
}


module.exports = function(app) {
	app.post('/signin', requireSignin, AuthenticationOperations.signin);
	app.post('/signup', AuthenticationOperations.signup);

	app.post('/add-bar', requireAuth, APIOperations.addBar); // indicate that we are going to a bar
	app.post('/remove-bar', requireAuth, APIOperations.removeBar); // indicate that we are no longer going to a bar
	app.get('/search-bars', optionalAuth, APIOperations.searchBars); // search for bars, with optional authentication
	app.get('/bars-user-data', optionalAuth, APIOperations.barsUserData); // get user data for the bars that have already been searched for, with optional authentication

	app.use(express.static("../../dist/client"));
	const path = require('path');
	app.get("/", (req, res) => {
		res.sendFile(path.join("../../dist/client/index.html")); // Cannot use render for html unlike pug etc
	});
}
