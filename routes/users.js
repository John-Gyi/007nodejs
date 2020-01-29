var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var User=require('../model/User');
var Post=require('../model/Post');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/useradd',function(req,res,next){
  res.render('user/user_add',{h1:'Hey Fighter John Lay'});
});

router.post('/useradd',function(req,res,next){
  var user=new User();
  user.name=req.body.name;
  user.email=req.body.email;
  user.password=req.body.password;
  user.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
    // res.render('user/user_list');
  })
})
router.get('/userlist',function(req,res,next){
  User.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('user/user_list',{users:rtn});
  })
})
router.get('/userdetail/:id',function(req,res,next){
  User.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    Post.find({author:req.params.id},function(err2,rtn2){
      if(err2) throw err2;
        res.render('user/user_detail',{user:rtn,post:rtn2});
    })

  })
})
router.get('/userupdate/:uid',function(req,res,next){
  User.findById(req.params.uid,function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/user_update',{user:rtn});
  });
});
router.post('/userupdate',function(req,res,next){
  var update={
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8),null)
  };
  User.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
  })
})
router.get('/userdelete/:delid',function(req,res,next){
  User.findByIdAndRemove(req.params.delid,function(err,rtn){
    if(err) throw err;
    res.redirect('/users/userlist');
  })
})
router.post('/duemail',function(req,res){
  User.findOne({email:req.body.email1},function(err,rtn){
    (rtn==null)? res.json({status:false}):res.json({status:true});
  })
})

module.exports = router;
