const passport = require('passport');
const User = require("../models/user.model");
const Drinks = require("../models/drinks.model");
const LocalStrategy = require('./localStrategy');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('SerializeUser called, ');
	console.log(user); 
	done(null, user)
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	console.log('DeserializeUser called, ');
	User.findOne({ _id: id }, (err, user) => {
		console.log('Deserialize user, user:')
		console.log(user)
		done(null, user)
	})
});

//  Use Strategies 
passport.use(LocalStrategy);

module.exports = passport

