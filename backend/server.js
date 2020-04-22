const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
// const cors = require('cors'); 
const mongoose = require('mongoose'); //helps us connect to our mongodb database 
const passport = require('./passport');
const path = require('path');
require("dotenv").config(); //configures so we have can have our environment variables in the dotenv file

const app = express();

// app.use(express.json()); //allow us to parse json 

//Mongo Stuff
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	const fs = require('fs');
	const fn = path.join(__dirname, 'config.json');
	const data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	const conf = JSON.parse(data);
	dbconf = conf.dbconf;
} 
else {
	// if we're not in PRODUCTION mode, then use
	dbconf = 'mongodb://localhost/alcohometrics';
}


// const uri = process.env.ATLAS_URI;
mongoose.connect(dbconf, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true}); 
const connection = mongoose.connection; 
connection.once("open", () => {
    console.log("MongoDB Database connection established.");
})

//Some Middleware
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
		secret: 'keyboard cat', //pick a random string to make the hash that is generated secure
		// store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //will not resave to the session store unless the session is modified. 
		saveUninitialized: false, //the session won’t be saved unless we modify it. 
		cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
	})
);

// Passport
app.use(passport.initialize());
// calls serializeUser and deserializeUser
// serializeUser stores the user id to req.session.passport.user = {id:"..."}
app.use(passport.session()); 


const usersRouter = require("./routes/users"); 
const drinksRouter = require("./routes/drinks"); 

app.use('/users', usersRouter); 
app.use('/drinks', drinksRouter);

app.listen(process.env.PORT || 5000);


//https://cloud.mongodb.com/v2/5e9637213c730b1f7e944efd#clusters/detail/Alcohometrics