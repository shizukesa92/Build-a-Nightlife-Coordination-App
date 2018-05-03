const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv").config({
	path: "./.env"
});


const uri = process.env.MONGOLAB_URI;
mongoose.connect(uri);

const router = require('./server/routes/Routes.js');
router(app);


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({
	type: '*/*'
}));


app.listen(process.env.PORT || 3000);
