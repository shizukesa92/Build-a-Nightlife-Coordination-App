const yelp = require('yelp-fusion');
const yelpClient = yelp.client(process.env.YELP_TOKEN);
const _ = require('lodash');
const Bar = require('../models/bar'); // Mongoose model
const dotenv = require("dotenv").config({
	path: "./.env"
});

// indicate that we are going to a bar
exports.addBar = function(req, res, next) {
	// request body: bar's yelp id
	const id = req.body.id;
	const index = req.body.index;
	const user_id = req.user._id; // authenticated user's object id

	// is user already at the bar?
	Bar.findOne({
		id,
		users: user_id
	}, function(err, bar) {
		if (err)
			return next(err);

		// if user is at the bar, return an error: we cannot add the user to the bar

		if (bar) {
			return res.status(422).send({
				error: "User is already at the bar and cannot join."
			});
		}

		// if not, upsert the user to the bar array
		Bar.findOneAndUpdate({
			id
		}, {
			$push: {
				users: user_id
			},
			$inc: {
				totalUsers: 1
			}
		}, {
			upsert: true,
			new: true
		}, function(err, bar) {
			if (err)
				return next(err);

			return res.json({
				message: "User was added to bar.",
				updatedBar: {
					id: bar.id,
					totalUsers: bar.totalUsers,
					userGoingQ: true,
					__order: index
				}
			});
		});
	});
};


// indicate that we are no longer going to a bar
exports.removeBar = function(req, res, next) {
	// request body: bar's yelp id
	const id = req.body.id;
	const index = req.body.index;
	const user_id = req.user._id; // authenticated user's object id

	// find and remove user
	Bar.findOneAndUpdate({
		id,
		users: user_id
	}, {
		$pull: {
			users: user_id
		},
		$inc: {
			totalUsers: -1
		}
	}, {
		new: true
	}, function(err, bar) {
		if (err)
			return next(err);

		if (!bar) {
			return res.status(422).send({
				error: "User is not at the bar and cannot be removed."
			});
		}

		if (bar.users.length == 0) {
			bar.remove(function(err, bar) {
				if (err)
					return next(err);

				return res.json({
					message: "User was removed from the bar, and empty bar has been deleted."
				});
			});
		} else {
			return res.json({
				message: "User was removed from the bar.",
				updatedBar: {
					id: bar.id,
					totalUsers: bar.totalUsers,
					userGoingQ: false,
					__order: index
				}
			});
		}
	});
};


// search for bars, with optional authentication
exports.searchBars = function(req, res, next) {
	// search terms required to find bars
	const location = req.query.location;
	const categories = "bars,nightlife";
	const user = req.user;

	// conduct search
	if (!location)
		return res.json({
			message: "Bars user data returned.",
			barSearchData: {},
			userData: {}
		});

	yelpClient.search({
		location,
		categories
	}).then(function(response) {
		const businesses = _.take(response.jsonBody.businesses, 30);

		const barSearchData = _.map(businesses, (element) => {
			return _.pick(element, ['id', 'name', 'url', 'image_url']);
		});

		const yelpIds = _.map(barSearchData, (element) => {
			return element.id;
		});
		const user_id = (user ? user._id : false);

		barDataQuery(yelpIds, user_id).exec(function(err, userData) {
			if (err)
				return next(err);

			return res.json({
				message: "Bars user data returned.",
				barSearchData,
				userData
			});
		});
	}).catch(function(err) {
		return next(err);
	});
};


// get user data for the bars that have already been searched for
exports.barsUserData = function(req, res, next) {
	// array of yelpIds
	const yelpIds = JSON.parse(req.query.yelpIdString); // req.query.yelpIdString is a string that we parse into an array here
	const user_id = (req.user ? req.user._id : false);

	barDataQuery(yelpIds, user_id).exec(function(err, userData) {
		if (err)
			return next(err);

		return res.json({
			message: "Bars user data returned.",
			userData
		});
	});
};


// helper function for obtaining data for bars that have been searched for
// this is for a logged in user if user_id is truthy, otherwise not logged in.
// returns a mongoose query that we can later execute.
function barDataQuery(yelpIds, user_id) {
	const match = {
		$match: {
			id: {
				$in: yelpIds
			}
		}
	};
	const project = {
		$project: {
			id: 1,
			totalUsers: 1,
			__order: {
				$indexOfArray: [yelpIds, "$id"]
			},
			userGoingQ: {
				$in: [user_id, "$users"]
			}
		}
	};
	const sort = {
		$sort: {
			__order: 1
		}
	};

	return Bar.aggregate([match, project, sort]);
}
