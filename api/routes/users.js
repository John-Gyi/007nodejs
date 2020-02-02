var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var User=require('../../model/User');
var Post=require('../../model/Post');


router.get('/list',function(req,res){
  console.log('call');
  User.find(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        users:rtn
      })
    }
  })
})
module.exports = router;
