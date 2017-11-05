var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin')
var uuid = require('uuid/v4')
var uri = 'mongodb://localhost:27017/appointment';
var db = mongoskin.db(uri)  
var User = require('../models/user');


router.get("/alldoctors",function(req,res){
	res.send(req.user.doctors)
})

router.post("/adddoctor",function(req,res){
	req.body.docUuid=uuid().split('-').join('');
	req.user.doctors.push(req.body)
	User.findOneAndUpdate({_id:req.user._id},{doctors:req.user.doctors},function(err,user){
		User.findOne({_id:user._id},function(err,user){
			if(err) throw err;
			res.send(user.doctors)
		})
	})
})

router.post("/deletedoctor",function(req,res){
	for (var i=0; i<req.user.doctors.length; i++){
		if(req.user.doctors[i].docName==req.body.docName){
			req.user.doctors.splice(i,1)
			i--  // decreasing iterable because splicingd decreases the length of array
		}
	}
	User.findOneAndUpdate({_id:req.user._id},{doctors:req.user.doctors},function(err,user){
		User.findOne({_id:user._id},function(err,user){
			if(err) throw err;
			res.send(user)
		})
	})
})

module.exports = router;