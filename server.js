const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
//Used for session storage in mongo
const MongoDbStore = require('connect-mongo')(session);
const passport = require('passport');
require('dotenv').config;

//MongoDB connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { keepAlive: 1, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`Database connected...`);
})

connection.on('error', () => {
    console.log(`Database error...$`);
})




//Session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//Express session config
app.use(session({
    //For cookies
    //secret: process.env.COOKIE_SECRET,
    secret: 'dkhfksjnchdsk',
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours

}));

//Passport config
const passportInit = require('./app/config/passport');

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//Express flash
app.use(flash());

//Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({}));


//Global middleware
app.use((req, res, next) => {
    //Will pick data from session and keeps the cart number saved after refresh.
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Set template engine.
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//defining routes
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`);
});



