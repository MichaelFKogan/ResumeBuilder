console.log('Orangization')
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var path = require('path');

router.post('/create', function(req,res) {

	models.Organization.create({
				OrganizationName: req.body.OrganizationName,
				pocName: req.body.pocName,
				pocPosition : req.body.pocPosition,
				phoneNumber : req.body.phoneNumber,
				email : req.body.email,
				webSite : req.body.Site,
				zipCode : req.body.zipCode
			}).then(function(Org){
				res.sendFile(path.join(__dirname + '/../public/posting.html'));
			})
});


module.exports = router;