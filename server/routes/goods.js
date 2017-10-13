var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Goods = require('../models/goods');
var User = require('../models/user');
mongoose.connect('mongodb://localhost:27017/shop');

mongoose.connection.on('connected', function () {
    console.log("mongondb connected success");
});

mongoose.connection.on('error', function () {
    console.log("mongondb connected fail");
});

mongoose.connection.on('disconnected', function () {
    console.log("mongondb connected disconnected");
});

// 请求商品列表
router.get('/list', function (req, res, next) {
    let sort = req.param('sort');
    let priceLevel = req.param('priceLevel');
    let priceGt = '',
        priceLte = '';

    let param = {};

    if (priceLevel != 'all') {
        /*switch (priceLevel) {
            case '0':
                priceGt = 0;
                priceLte = 100;
                break;
            case '1':
                priceGt = 100;
                priceLte = 500;
                break;
            case '2':
                priceGt = 500;
                priceLte = 1000;
                break;
            case '3':
                priceGt = 1000;
                priceLte = 5000;
                break;
        }*/

        let priceItem = [
            [0, 100],
            [100, 500],
            [500, 1000],
            [1000, 5000]
        ];

        param = {
            salePrice: {
                // $gt:priceGt,
                // $lt:priceLte
                $gt: priceItem[priceLevel][0],
                $lte: priceItem[priceLevel][1]
            }
        }
    }

    let currentPage = (parseInt(req.param('page')) > 0) ? parseInt(req.param('page')) : 1;
    let pagesize = (parseInt(req.param('pagesize')) > 0) ? parseInt(req.param('pagesize')) : 8;
    let skip = (currentPage - 1) * pagesize;

    let goodsModel = Goods.find(param).sort({
        'salePrice': sort
    }).skip(skip).limit(pagesize);
    goodsModel.exec({}, function (err, doc) {
        res.json({
            status: 0,
            result: doc
        });
    });


});

router.post('/addCart', function (req, res, next) {
    // 查询用哪个用户，确定好用户
    let userId = '100000077';
    let productId = req.body.productId; // 通过post传参
    User.findOne({
        userId: userId
    }, function (err, userDoc) {
        // console.log(userDoc);

        let goodItem = '';
        userDoc.cartList.forEach(function (item) {
            if (item.productId == productId) {
                // 此时表示在购物车列表里存在这个商品，让其数量加1
                goodItem = item;
                item.productNum++;
            }
        });

        // 如果不是第一次加入购物车
        if (goodItem) {
            userDoc.save(function (err3, doc3) {
                if (err3) {
                    res.json({
                        status: 1,
                        msg: err3.message
                    });
                } else {
                    res.json({
                        status: 0,
                        msg: '',
                        result: '商品数量添加成功！'
                    });
                }
            });
        } else {
            // 怎么判断是第一次加入购物车 还是购物车里面已经有了

            Goods.findOne({
                productId: productId
            }, function (err1, goodsDoc) {
                console.log(productId);
                console.log(goodsDoc);

                goodsDoc.productNum = 1;

                // 此时去查询这个商品是否存在于用户购物车列表里面
                userDoc.cartList.push(goodsDoc);
                userDoc.save(function (err2, doc2) {
                    if (err2) {
                        res.json({
                            status: 1,
                            msg: err2.message
                        })
                    } else {
                        res.json({
                            status: 0,
                            msg: '',
                            result: '加入购物车成功'
                        })
                    }
                })
            });
        }
    });
});



module.exports = router;