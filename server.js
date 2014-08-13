// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var term 	   = require(__dirname + '/term.json');
var cls 	   = require(__dirname + '/class.json');
var course 	   = require(__dirname + '/course.json');
var department = require(__dirname + '/department.json');
var enrollment = require(__dirname + '/enrollment.json');
var faculty    = require(__dirname + '/faculty.json');
var subject    = require(__dirname + '/subject.json');
var user 	   = require(__dirname + '/user.json');
var apiDocs    = require(__dirname + '/api-docs.json');

// configure app
app.use(bodyParser());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
  next();
 });

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
var Bear     = require('./app/models/bear');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/api-docs.json')

	.get(function(req, res) {
			res.json( apiDocs );
	});

router.route('/api-docs.json/term')

	.get(function(req, res) {
			res.json( term );
	});

router.route('/api-docs.json/class')

	.get(function(req, res) {
			res.json( cls );
	});

router.route('/api-docs.json/course')

	.get(function(req, res) {
			res.json( course );
	});

router.route('/api-docs.json/department')

	.get(function(req, res) {
			res.json( department );
	});

router.route('/api-docs.json/enrollment')

	.get(function(req, res) {
			res.json( enrollment );
	});

router.route('/api-docs.json/faculty')

	.get(function(req, res) {
			res.json( faculty );
	});

router.route('/api-docs.json/subject')

	.get(function(req, res) {
			res.json( subject );
	});

router.route('/api-docs.json/user')

	.get(function(req, res) {
			res.json( user );
	});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
