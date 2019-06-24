var express = require('express')
var router = express.Router();

var bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var _ = require("lodash")
const User = require("../models/user.js")

const checkLogIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/404')
    }
}

router.get('/auth', (req, res) => {
    res.render('auth')
})

router.post('/auth', urlencodedParser, (req, res) => {
    switch (req.body.action) {
        case 'signup':
            User.findOne({ email: req.body.email }, function (err, doc) {
                if (err) {
                    console.log(err, 'error')
                    res.redirect('/')
                    return
                }
                if (_.isEmpty(doc)) {
                    let newUser = new User();
                    newUser.email = req.body.email;
                    newUser.password = req.body.password;
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err, 'error')
                            return
                        }
                        res.render('index', { message: "Sign Up Successful. Please log in." })
                    });

                } else {
                    res.render('index', { message: "User already exists" })
                }
            })
            break;
        case 'login':
            User.findOne({ email: req.body.email, password: req.body.password }, function (err, doc) {
                if (err) {
                    console.log(err, 'error')
                    res.redirect('/')
                    return
                }
                if (_.isEmpty(doc)) {
                    res.render('auth', { message: "Please check email/password" })
                } else {
                    req.session.user = doc
                    res.redirect('/user/dashboard')
                }
            })
            break;
    }

})


router.get('/dashboard', checkLogIn, (req, res) => {
    res.render('user', { user: req.session.user })
})

module.exports = router