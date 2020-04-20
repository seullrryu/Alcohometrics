const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors'); 
const mongoose = require('mongoose'); //helps us connect to our mongodb database 
const passport = require('./passport');
const cookieParser = require('cookie-parser');
require("dotenv").config(); //configures so we have can have our environment variables in the dotenv file

const app = express();

app.use(cors());
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });
  
	
// app.use(express.json()); //allow us to parse json 

//Mongo Stuff
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true}); 
const connection = mongoose.connection; 
connection.once("open", () => {
    console.log("MongoDB Database connection established.");
})
// const MongoStore = require('connect-mongo')(session)

app.use(cookieParser());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

app.use(session({
		secret: 'keyboard cat', //pick a random string to make the hash that is generated secure
		// store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //will not resave to the session store unless the session is modified. 
		saveUninitialized: false, //the session won’t be saved unless we modify it. 
		cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) }
	})
)

// Passport
app.use(passport.initialize());
// calls serializeUser and deserializeUser
// serializeUser stores the user id to req.session.passport.user = {id:"..."}
app.use(passport.session()); 


const usersRouter = require("./routes/users"); 
const drinksRouter = require("./routes/drinks"); 

app.use('/users', usersRouter); 
app.use('/drinks', drinksRouter);

app.listen(5000, () => {
    console.log("server is running on port 5000");
});


//https://cloud.mongodb.com/v2/5e9637213c730b1f7e944efd#clusters/detail/Alcohometrics