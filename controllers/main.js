var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knex = require('../db/knex');

router.get('/robots.txt', function(req, res) {
    res.render('robots.txt');
})

router.get('/index', isLoggedIn, function(req, res) {
    console.log(req.user);

    knex('rsvp').where('group_name', req.user.group_name).first().then(function(user_rsvp) {
        res.render('index', {user: req.user, rsvp: user_rsvp});
    })
})

router.post('/rsvp', isLoggedIn, function(req, res) {
    var rsvpResponse = req.body.rsvpRadio === "accept";
    var rehearsalDinnerRsvpResponse = req.body.rehearsalDinnerRsvpRadio === "accept";
    var sundayBrunchRsvpResponse = req.body.sundayBrunchRsvpRadio === "accept";

    knex('rsvp').insert({
        group_name: req.body.group_name,
        names: JSON.stringify(req.body.person),
        response: rsvpResponse,
        notes: req.body.notes,
        rehearsal_dinner_response: rehearsalDinnerRsvpResponse,
        sunday_brunch_response: sundayBrunchRsvpResponse,
    }).then(function() {
        console.log('done');
    });


    //right now redirect, but moght be better to just close the modal upon submit
    res.redirect('/index');
})

router.get('/rsvptable', isLoggedIn, function(req, res) {

    if (req.user.group_name === 'test2' || req.user.group_name === 'br_walzer') {
        console.log(req.user.group_name);
        knex('rsvp').orderBy('id', 'ASC').then(function(rsvps) {
            res.render('rsvp_table', {rsvps: rsvps});
        })
    } else {
        res.status(404)        // HTTP status 404: NotFound
            .send('Not found');
    }

})

router.get('/missingrsvp', isLoggedIn, function(req, res) {

    if (req.user.group_name === 'test2' || req.user.group_name === 'br_walzer') {
        console.log(req.user.group_name);

        knex.select('party_numbers.group_name')
          .from('party_numbers')
          .leftOuterJoin('rsvp', 'party_numbers.group_name', 'rsvp.group_name')
          .whereNull('rsvp.group_name')
          .then(function(missing) {
           res.render('missing_rsvp_table', {missing_groups: missing});
        });
    } else {
        res.status(404)        // HTTP status 404: NotFound
          .send('Not found');
    }
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
