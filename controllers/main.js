var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');


router.get('/index', isLoggedIn, function(req, res) {
    console.log(req.user.user_id);
    res.render('index', {user: req.user});
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
