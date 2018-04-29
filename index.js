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


app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
