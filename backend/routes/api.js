const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product')

router.get('/login', (req, res, next) => {
    console.log(req.query.email, req.query.password);
    User.findOne({ email: req.query.email, password: req.query.password }).then((user) => {
        if (user == null || user == undefined) {
            res.send('There are no users with such credentials in the database');
        } else {
            res.send(user);
        };
    }).catch(next);
});

router.post('/signup', (req, res, next) => {
    User.create(req.body).then(() => {
        User.find({}).then((users) => {
            res.send(users);
        });
    }).catch(next);
});

router.get('/products', (req, res, next) => {
    Product.find({}).then(function (products) {
        res.send(products);
    }).catch(next);
});

module.exports = router;