var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

//Login page
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        // user already logged in. redirect to /index
        res.redirect('/index');
    } else {
        // hasn't logged in. show the login wall.
        res.render('login', {message: req.flash('loginMessage')});
    }
})

//Login route
router.post('/login', passport.authenticate('login', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash : true})
);

router.post('/signup', passport.authenticate('login', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash : true})
);

module.exports = router;
