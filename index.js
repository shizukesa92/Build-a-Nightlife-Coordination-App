// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv").config({
	path: "./.env"
});

// DB Setup
const uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);


// App setup
app.use(morgan('combined'));
app.use(cors()); // completely enable cross origin
app.use(bodyParser.json({
	type: '*/*'
}));
router(app);


// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port, function() {
	console.log('Server listening on', port);
});
