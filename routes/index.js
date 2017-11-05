var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard',{
		doctors:req.user.doctors
	});
});
router.get('/doctors', ensureAuthenticated, function(req, res){
	res.render('doctors',{doctors:req.user.doctors});
});

router.get('/patients', ensureAuthenticated, function(req, res){
	res.render('patients',{doctors:req.user.doctors});
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/login');
	}
}

module.exports = router;