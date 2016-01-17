var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//var knex = require('../db/knex');

router.get('/', function(req, res) {
    res.render('index')
})

module.exports = router;
