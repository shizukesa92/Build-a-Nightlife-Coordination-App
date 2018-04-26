const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./server/models/User');
require('./server/models/Poll');
require('./server/models/Voters');
require('./server/controllers/passport');

const dotenv = require("dotenv").config({
	path: "./.env"
});

const uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

const cookieKey = process.env.COOKIE_KEY;
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

require('./server/routes/authRoutes')(app);
require('./server/routes/pollRoutes')(app);


app.use(express.static("./dist/client"));
const path = require('path');
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
});
app.listen(process.env.PORT || 3000);
