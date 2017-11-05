var express = require('express');
var router = express.Router();
var mongoskin = require('mongoskin')
var User = require('../models/user');

var uri = 'mongodb://localhost:27017/appointment';
var db = mongoskin.db(uri)  

router.post('/addpatient',addCollection,function(req,res,next){

	req.collection.count({},function(err,count){
		if (err) return next(err)
			req.body.number=count+1
		req.collection.insert(req.body, {}, function(e, results){
    		if (e) return next(e)
    			if(results)
			res.redirect('/dashboard')
	  	})

	})
})

router.post('/deletepatient',addCollection,function(req,res,next){
	req.collection.remove({name:req.body.name,phone:req.body.phone},{justOne:true}, function(e, results){
   		if (e) return next(e)
    	res.send(results)
  	})
})

router.post('/allpatient',addCollection,function(req,res,next){
  	req.collection.find({}).toArray(function(e, results){
    	if (e) return next(e)
    		if(results)
		      	res.render('patients',{
		      		doctors:req.user.doctors,
		      		patients:results
		      	})
    })
})

router.get('/:hospital/:docuuid/:date',function(req,res){
  
   User.getUserByUsername(req.params.hospital, function(err, user){
      if(err) throw err;
      if(!user){
        res.send("Wrong Request")
      }else{

	      	for (var i=0; i<user.doctors.length; i++){
				if(user.doctors[i].docUuid==req.params.docUuid){
					var collection=req.params.date+req.params.hospital+req.params.docUuid;
					req.collection=db.collection(collection);
					break;
				}
			}
			req.collection.find({}).toArray(function(e, results){
	    	if (e) return next(e)
	      	res.send(results)
	    	})
      	}	
 	})
})

router.post('/schedule',function(req,res){

	for(var i=0;i<req.user.doctors.length;i++){
		if(req.user.doctors[i].name==req.body.docName)
			req.body.docUuid = req.user.doctors[i].docUuid
			break;
	}

	var collection='availability'+req.body.date+req.body.docUuid
  	req.collection.find({}).toArray(function(e, results){
    	if (e) return next(e)
      	res.send(results)
    })
})

// router.post('/bookappointment',function(req,res){

// // add code to check availability

// 	for(var i=0;i<req.user.doctors.length;i++){
// 		if(req.user.doctors[i].name==req.body.docName)
// 			req.body.docUuid = req.user.doctors[i].docUuid
// 			break;
// 	}

// 	var collection='availability'+req.body.date+req.body.docUuid
//   	req.collection.find({}).toArray(function(e, results){
//     	if (e) return next(e)
//       	res.send(results)
//     })
// })




function addCollection(req,res,next){
	for(var i=0;i<req.user.doctors.length;i++){
		if(req.user.doctors[i].docName==req.body.docName){
			req.body.docUuid = req.user.doctors[i].docUuid
		}
	}
	var collection = req.body.date+req.body.docUuid;
	req.collection=db.collection(collection);
	return next();
}



module.exports = router;