const mongoose = require("mongoose"); 
const express = require('express');
const path = require('path');

require("./db");
const app = express();
// app.set('view engine', 'hbs');

const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false })); //body parser 

const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));


app.get('/', (req, res) => {
//   res.render('index');
});

app.listen(3000);
