var models  = require('../models');
var express = require('express');
var router  = express.Router();

//**********************************
//nodeMailer
//******************************
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://senthilbackup42%40gmail.com:kitehigh@smtp.gmail.com');


router.get('/', function(req, res) {
	//console.log("jjjjooooobbbbb    "+ JSON.stringify(req.session));
	var zipCodeVar=req.session.zipCode;

	models.Jobs.findAll({
		include: [ models.Organization ],
		where: {jobZipCode: zipCodeVar}
	}).then(function(data){

		var hbsObject = {
			userFirstName: req.session.firstName,
			userLastName: req.session.lastName,
			userzipCode:req.session.zipCode,
			userEmail:req.session.email,
			jobs: data};
		//console.log(JSON.stringify(data[1]));
		res.render('index', hbsObject)
	})
});

router.post('/email/:id', function(req, res) { 
	//console.log(req.params.id);
	//console.log(JSON.stringify(req.body));
	//console.log(JSON.stringify(req.sessions));

	models.Jobs.findOne({
		include: [ models.Organization ],
		where: {id:req.params.id}
	}).then(function(data){
		// setup e-mail data with unicode symbols 
		//var text=JSON.stringify(data)
		var text = "Title :"+data.title + "<br>" + "Description:" + data.desc;
			text= text + "<br> Point of Contact : " + data.Organization.pocName;
			text = text +"<br> Phone : " +data.Organization.phoneNumber+"<br> E-mail: "+ data.Organization.eMail;
			text = text +"<br> Website : "+ data.Organization.webSite;
		var mailOptions = {
		    from: '"Resume Padder" <resume@padder.com>', // sender address 
		    to: req.body.email, // list of receivers 
		    subject: data.title, // Subject line 
		    text: text, // plaintext body 
		    html: '<b>'+ text+'</b>' // html body 
		};

		transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        throw error;
	    }
    		res.redirect('/jobs');
		});
	})

});


module.exports = router;


