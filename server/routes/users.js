var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 用户登录
router.post('/login', function (req, res, next) {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  };

  User.findOne(param, function (err, doc) {
    console.log(doc);
    if (err) {
      res.json({
        status: 1,
        msg: '用户名或密码错误'
      });
    } else {
      res.cookie('userId', doc.userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });

      res.cookie('userName', doc.userName, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });

      if (doc) {
        res.json({
          status: 0,
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }

    }
  });

});

// 检测用户是否登录
router.post('/checkLogin',function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:0,
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:1,
      msg:'用户未登录',
      result:''
    })
  }
});

// 退出功能
router.post('/logout',function(req,res,next){
  res.cookie('userId','',{
    path:'/',
    maxAge:-1
  });

  res.json({
    status:0,
    result:'退出成功'
  });
});


router.post('/cartlist',function(req,res,next){
  let userId = req.cookies.userId;

  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({status:1,msg:err.doc,result:''});
    }else{
      res.json({status:0,msg:'',result:doc.cartList});
    }
  });
});

router.post('/cartEdit', function(req, res, next) {
  let userId = req.cookies.userId,
      productId = req.body.productId,
      checked = req.body.checked,
      productNum = req.body.productNum;

  User.update({ 'userId': userId, "cartList.productId": productId }, {
      "cartList.$.productNum": productNum,
      "cartList.$.checked": checked
  }, function(err, doc) {
      if (err) {
          res.json({
              status: '1',
              msg: err.message,
              result: ''
          })
      } else {
          res.json({
              status: '0',
              msg: '',
              result: '添加购物车成功'
          })
      }
  })
});

router.post('/editCheckAll', function(req, res, next) {
  let userId = req.cookies.userId,
      checkAll = req.body.checkAll;

  User.findOne({ 'userId': userId }, function(err, user) {
      if (err) {
          res.json({
              status: '1',
              msg: err.message,
              result: ''
          })
      } else {
          user.cartList.forEach((item) => {
              item.checked = checkAll;
          })

          user.save(function(err1, doc1) {
              if (err1) {
                  res.json({
                      status: '1',
                      msg: err.message,
                      result: ''
                  })
              } else {
                  res.json({ status: '0', msg: '', result: '操作成功' })
              }
          })
      }
  })
});


module.exports = router;