const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const passport = require('passport');

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




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(passport.initialize());

require("./server/controllers/passport");
require("./server/routes/users.routes")(app);
app.use(express.static("./dist/client"));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/dist/client/index.html")); // Cannot use render for html unlike pug etc
});
app.listen(process.env.PORT || 3000);
