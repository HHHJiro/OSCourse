const 
	api = require('./api/user.js'),
	fs = require('fs'),
	path = require('path'),
	bodyParser = require('body-parser'),
	express = require('express'),
	app = express();
const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost/OScourse'
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);


app.listen(8088);
console.log('success listen…………');