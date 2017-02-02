// DEPENDENCIES
// ===============================================
var express = require('express');
var path = require('path');
var methodOverride = require('method-override'); // for deletes in express
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require("request");
var app = express();

// MONGOOSE DEPENDENCIES
// ===============================================
var mongoose = require("mongoose");
var Promise = require("bluebird");
mongoose.Promise = Promise;
var Results = require("./models/Results.js");


  // LOADS STATIC CONTENT
  // ===============================================
  // Serve static content from the "public" directory.
app.use(express.static(process.cwd() + '/public'));
  // app.use(express.static(path.join(__dirname, 'public')));
                          //OR
  // Make public a static dir
  // app.use(express.static("public"));

// BODY-PARSER
// ===============================================
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// METHOD OVERRIDE for POST, DELETE, and PUT
// ===============================================
app.use(methodOverride('_method'))
// ===============================================

// MORGAN
// ===============================================
app.use(logger('dev'));

// LOAD HANDLEBARS
// ===============================================
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// VIEW ENGINE
// ===============================================
app.set('views', path.join(__dirname, 'views'));

// MONGOOSE
// ===============================================
mongoose.connect("mongodb://localhost/ResumeBuilder");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});





var variable = "";
var searchResults = {};


app.get('/', function(req, res){

    var data = {placeholder: searchResults.results};

    res.render('index', data);

});

app.get('/search', function(req, res){
    res.send(searchResults.results);
});

app.post('/', function(req, res){

    // console.log("2: ===================================")
    // console.log("keyword: "+ req.body.keyword);
    // console.log("location: " + req.body.location);
    // console.log("3: ===================================")

    function runQuery(keyword, location, random){       
    request("http://api.indeed.com/ads/apisearch?publisher=4548195452860771&v=2&format=json&q="+keyword+"&l="+location+"&sort=date&radius=25&start=0&limit=25&latlong=1&co=us&userip=1.2.3.4&useragent=GoogleChrome&v=2", function (error, response, body) {
              
    if (!error && response.statusCode == 200) {
        searchResults = JSON.parse(body);
        random();
    }})}

    runQuery(req.body.keyword, req.body.location, function(){
    res.redirect('/');
    })

});











// PORT
// ===============================================
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
console.log('Server listening on port ' + server.address().port);
  });
