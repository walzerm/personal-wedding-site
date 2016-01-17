var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var knex = require('../db/knex');

router.get('/', function(req, res) {
    res.render('index')
})

router.get('/login', function(req, res) {
    res.render('login')
})

module.exports = router;
