// DEPENDENCIES
// ===============================================
var express = require('express');
var path = require('path');
var methodOverride = require('method-override'); // for deletes in express
var bodyParser = require('body-parser');
var logger = require('morgan');
var request = require("request");
var router  = express.Router();
var app = express();

// MONGOOSE
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

// VIEW ENGINE
// ===============================================
app.set('views', path.join(__dirname, 'views'));

// LOAD HANDLEBARS
// ===============================================
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// MORGAN
// ===============================================
app.use(logger('dev'));
// BODY-PARSER
// ===============================================
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// METHOD OVERRIDE for POST, DELETE, and PUT
// ===============================================
app.use(methodOverride('_method'))
// ===============================================================



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



// CATCH 404 AND FORWARD TO ERROR HANDLER
// ===============================================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ERROR HANDLER
// ===============================================
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});




app.get('/', function(req, res){
    res.render('index');
});


// ROUTES
// ===============================================
// router.get('/',function(req,res){
//   res.render("index");
//     // res.sendFile(path.join(__dirname + '/../public/index.html'));
// })


// POST TO /SEARCH 
// ===============================================
// Recieve Search, HTTP request, recieve results, send to DB
var variable = "";

app.post('/', function(req, res) {
    console.log("posted")
    console.log(req);
    console.log("========================================")
    console.log(req.body.keyword);
    console.log(req.body.location);
    console.log("========================================")

        function runQuery(keyword, location){
            
            request("http://api.indeed.com/ads/apisearch?publisher=4548195452860771&v=2&format=json&q="+keyword+"&l="+location+"&sort=date&radius=25&start=0&limit=25&latlong=1&co=us&userip=1.2.3.4&useragent=GoogleChrome&v=2", function (error, response, body) {
              
            if (!error && response.statusCode == 200) {
                console.log(body) // Show the HTML for the INDEED API.
                // THIS IS A LOOP
                
                // $(".title.may-blank").each(function(i, element){
                //     var result = [];
                //         var title = $(this).text();
                //         var link = $(this).attr("href");
                //     result.push({title: title, link: link});
                //         console.log(result);
                //         db.Results.insert(result);
                // });
            }
            })
        } 
    // runQuery(req.body.keyword, req.body.location);
    res.redirect('/');
    console.log("posted2")
});



// GET /SEARCH
// ===============================================
// This will get the API Results from the mongoDB
app.get("/search", function(req, res) {
  // Grab every doc in the Articles array
  db.Results.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });


});










// PORT
// ===============================================
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
console.log('Server listening on port ' + server.address().port);
  });
