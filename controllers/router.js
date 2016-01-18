var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

router.get('/', function(req, res) {
    res.render('login')
})

router.post('/signin', function(req, res) {
    knex('rsvp').insert({guest_name: req.body.inputPassword}).then(function() {
        res.redirect('/index')
    })

})

router.get('/index', function(req, res) {
    res.render('index')
})

module.exports = router;
