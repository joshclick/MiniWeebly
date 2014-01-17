// set up ========================
var express  = require('express');
var app      = express();                       // create our app w/ express
var mongoose = require('mongoose');             // mongoose for mongodb
var port     = 9076;
var database = require('./app/config/database');    // load db config

// configuration =================
mongoose.connect(database.url);

app.configure(function() {
    //Set views path, template engine and default layout
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'jade');

    app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
    app.use(express.logger('dev'));                 // log every request to the console
    app.use(express.bodyParser());                  // pull information from html in POST
    app.use(express.methodOverride());              // simulate DELETE and PUT
});

// load the routes
require('./app/config/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);