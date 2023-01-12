const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000 ;
const mongoose = require('mongoose');

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

//Assets
app.use(express.static('public'));

// Set template engine.
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//defining routes
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port : ${PORT}`);
});



