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
    expressSession = require('express-session'),
    pg = require('pg'),
    pgSession = require('connect-pg-simple')(expressSession),
    favicon = require('serve-favicon');

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));

var env = process.env.NODE_ENV || 'development';
var conString = env == 'production' ? null : 'postgresql://localhost:5432/wedding';

app.use(expressSession({
  store: new pgSession({
      pg: pg,
      conString: conString,
  }),
  secret: 'supersecret',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days ,
}));

//Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

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
        knex('party_numbers').where('group_name', userID.toLowerCase()).first().then(function(user) {
            if (!user) {
                // couldn't find user
                return done(null, false, req.flash('loginMessage', 'Incorrect username and/or password'));
            }

            console.log(user);

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
