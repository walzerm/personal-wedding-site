var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

//Login page
router.get('/', function(req, res, next) {
    res.render('login')
})

//Login route
router.post('/login', passport.authenticate('login', {
    successRedirect: '/index',
    failureRedirect: '/'})
);

module.exports = router;
