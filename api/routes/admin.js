var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var Admin=require('../../model/Admin');


router.post('/signup',function(req,res){
  var admin=new Admin();
  admin.name=req.body.name;
  admin.email=req.body.email;
  admin.password=req.body.password;
  admin.save(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(201).json({
        message:"Admin Account Created!",
        admin:rtn
      })
    }
  })
})
module.exports = router;
