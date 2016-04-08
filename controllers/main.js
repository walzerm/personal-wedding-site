var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

router.get('/robots.txt', function(req, res) {
    res.render('robots.txt');
})

router.get('/index', isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('index', {user: req.user});
})

router.post('/rsvp', function(req, res) {
    console.log(req.body);


    //right now redirect, but moght be better to just close the modal upon submit
    res.redirect('/index');
})

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to login page
    res.redirect('/');
}

module.exports = router;
