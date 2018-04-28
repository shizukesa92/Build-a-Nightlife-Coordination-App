const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const yelpBasePath = "https://api.yelp.com/v3/businesses/search?categories=nightlife";
const app = express();

const cookieKey = process.env.COOKIE_KEY;
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [cookieKey]
	})
);

const dotenv = require("dotenv").config({
	path: "./.env"
});

const uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);

const authenticate = require('./server/controllers/authenticate');
const verify = require('./server/controllers/verify');
const Users = require('./models/users');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(passport.initialize());



app.use(express.static("./dist/client"));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
});
app.listen(process.env.PORT || 3000);

app.post('/nightlife', (req, res) => {
	let {
		location,
		sortBy
	} = req.body;
	let url = `${yelpBasePath}&location=${location}&sort_by=${sortBy}`;
	fetch(url, {
			headers: {
				'Authorization': process.env.YELP_TOKEN,
				'Accept': 'application/json'
			}
		}).then(res => res.json())
		.then(yelpResp => res.json(yelpResp))
})

app.put('/rsvps', verify.verifyUser, (req, res) => {
	let {
		username,
		rsvps
	} = req.body;
	Users.findOneAndUpdate({
		username
	}, {
		rsvps
	}, (err, user) => {
		if (err) res.json({
			message: 'failed to update rsvps'
		})
		res.json({
			message: 'successfully updated rsvps'
		})
	})
})

app.post('/account', (req, res, next) => {
	let {
		username,
		password,
		actionType
	} = req.body;
	switch (actionType) {
		case 'signup':
			Users.register(new Users({
				username
			}), password, (err, user) => {
				if (err) {
					return res.status(500).json({
						error: err.message
					});
				}
				user.save((err, user) => {
					passport.authenticate('local')(req, res, () => {
						let token = verify.getToken(user);

						res.status(200).json({
							message: 'Signup and login Successfully',
							success: true,
							token,
							userInfo: {
								username: user.username,
								rsvps: user.rsvps
							}
						});
					});
				});
			});
			break;
		case 'login':
			passport.authenticate('local', (err, user, info) => {
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.status(401).json({
						error: 'Incorrect username or password'
					})
				}
				req.logIn(user, err => {
					if (err) {
						return res.status(500).json({
							error: 'Could not log in user'
						});
					}
					// generate token
					let token = verify.getToken(user);

					res.status(200).json({
						message: 'Login Successfully',
						success: true,
						token,
						userInfo: {
							username: user.username,
							rsvps: user.rsvps
						}
					});
				});
			})(req, res, next);
			break;
		case 'logout':
			req.logout();
			res.status(200).json({
				message: 'Logout Successfully!'
			});
			break;
		default:
			res.json({
				error: 'unrecognized action'
			})
	}
})

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
