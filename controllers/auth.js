var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

//Login page
router.get('/', function(req, res, next) {
    res.render('login', { message: req.flash('loginMessage') })
})

//Login route
router.post('/login', passport.authenticate('login', {
    successRedirect: '/index',
    failureRedirect: '/',
    failureFlash : true})
);

module.exports = router;
