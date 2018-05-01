const verify = require('../controllers/users.controller');
const Users = require('../models/users');
const express = require('express');
const app = express();
const yelpBasePath = "https://api.yelp.com/v3/businesses/search?categories=nightlife";
const fetch = require('node-fetch');
const passport = require('passport');

const route = () => {
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
};
module.exports = route;
