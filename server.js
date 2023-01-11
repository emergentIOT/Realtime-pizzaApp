const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000 ;

// Set template engine.
//app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`);
});

//Home page
app.get("/", (req, res) => {
    //Render home page html.
    res.render('home');
})

//Cart page
app.get("/cart", (req, res) => {
    res.render('customers/cart');
})

//Login page
app.get("/login", (req, res) => {
    res.render('auth/login');
})

//Register page
app.get("/register", (req,res) => {
    res.render('auth/register');
})

