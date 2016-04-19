var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    path = require('path')
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt'),
    cookieParser = require('cookie-parser'),
    knex = require('./db/knex'),
    morgan = require('morgan'),
    flash = require('connect-flash'),
    expressSession = require('express-session');

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(expressSession({
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true
}));

//Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Set router
var authRoutes = require('./controllers/auth');
var mainRoutes = require('./controllers/main');


//Authenticate
passport.serializeUser(function(userID, done) {
    done(null, userID);
})

passport.deserializeUser(function(userID, done) {
    knex('party_numbers').where('group_name', userID).first().then(function(user) {
        done(null, user);
    })
})

passport.use('login', new LocalStrategy({
    usernameField: 'userID',
    passwordField: 'password',
    passReqToCallback: true
    },
    function(req, userID, password, done) {

        //Query the table for user
        knex('party_numbers').where('group_name', userID).first().then(function(user) {
            console.log(user);
            //if no user, add user
            if (!user) {
                var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
                knex('party_numbers').insert({group_name: userID, password: hash, attendees: 3, rsvp: false}).then(function(user) {
                    return done(null, user.group_name);
                })
            }
            //compare the passwords
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, req.flash('loginMessage', 'Incorrect username and/or password'));
            }
            return done(null, user.group_name);
        })
    }

))

//Middleware to check if user is logged in
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
})

//Use routes
app.use(authRoutes);
app.use(mainRoutes);


app.listen(process.env.PORT || 8000, function() {
    console.log('Server going at 8000...');
})
