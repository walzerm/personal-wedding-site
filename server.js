var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    path = require('path')
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    cookieParser = require('cookie-parser')
    expressSession = require('express-session');


//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


//Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Authenticate
// passport.serializeUser(function(userID, done) {
//     done(null, userID);
// })
//
// passport.deserializeUser(function(userID, done) {
//     knex('party_numbers').where('userID', userID).first().then(function(user) {
//         done(null, user);
//     })
// })
//
// passport.use('login', new LocalStrategy({
//     userID: 'userID',
//     password: 'password',
//     passReqToCallback: true
//     },
//     function(req, userID, password, done) {
//         knex('party_numbers').where('userID', userID).first().then(function(user) {
//             if (!user || !bcrypt.compareSync(password, user.password)) {
//                 return done(null, false, req.flash('message', 'Invalid userID or password'));
//             }
//             return done(null, user.userID);
//         })
//     }
// ))
//
// app.use(function (req, res, next) {
//     res.locals.loggedIn = req.isAuthenticated();
// })

//Set router
var router = require('./controllers/router');
app.use(router);

app.listen(process.env.PORT || 8000, function() {
    console.log('Server going at 8000...');
})
