var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var path = require('path');

//this is the users_controller.js file
router.get('/new', function(req,res) {
	//console.log("NNNNNEEEEEWWWWW")
	res.sendFile(path.join(__dirname + '/../public/register.html'));
});

router.get('/signOut', function(req,res) {
  req.session.destroy(function(err) {
  	res.send("logged out")
     //res.redirect('/')
  })
});


// login
router.post('/login', function(req, res) {
	//console.log("llllooogggiiinnn"+ JSON.stringify(req.body));
  models.User.findOne({
    where: {email: req.body.email}
  }).then(function(user) {

		if (user == null){
			res.redirect('/')
		}

    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
      // if the result is true (and thus pass and hash match)
      if (result == true){
        req.session.logged_in = true;
		req.session.firstName = user.firstName;
		req.session.lastName = user.lastName;
        req.session.user_id = user.id;
        req.session.email = user.email;
        req.session.zipCode = user.zipCode;
       res.redirect('/jobs')
       
      }
      // if the result is anything but true (password invalid)
      else{
      	// redirect user to sign in
				res.redirect('/')
			}
    })
  })
});

// register a user
router.post('/create', function(req,res) {
	//console.log("Create userSS")
	models.User.findAll({
    where: {email: req.body.email}
  }).then(function(users) {

		if (users.length > 0){
			console.log(users)
			res.send('we already have an email or username for this account')
		} else {
			// Using bcrypt, generate a 10-round salt,
			// then use that salt to hash the user's password.
			bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
					
			// Using the User model, create a new user,
			// storing the email they sent and the hash you just made
			//console.log(req.body);
			models.User.create({
				email: req.body.email,
				firstName: req.body.firstName,
				lastName : req.body.lastName,
				zipCode : req.body.zipCode,
				interest : req.body.interest,
				password_hash: hash
			})
					// In a .then promise connected to that create method,
					// save the user's information to req.session
					// as shown in these comments
					.then(function(user){
						//console.log("user" + user)
						// we save the logged in status to the session
	          			req.session.logged_in = true;
						req.session.firstName = user.firstName;
						req.session.lastName = user.lastName;
				        req.session.user_id = user.id;
				        req.session.email = user.email;
				        req.session.zipCode = user.zipCode;
	          			// redirect to home on login
						res.redirect('/jobs')
					})
				})
			})
		}
	})
});

module.exports = router;