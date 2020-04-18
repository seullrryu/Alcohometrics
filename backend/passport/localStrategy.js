const User = require("../models/user.model");
const LocalStrategy = require('passport-local').Strategy; 

const strategy = new LocalStrategy(
	{
		usernameField: 'username' 
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			//passport calls passport.serializeUser, defined in the passport/index.js file. 
            //This assigns the user id we just received to req.session.passport.user = { /* serialized user id */}, 
            //AND the whole user object to req.user = {/* user object from database */}.
			return done(null, user)
		})
	}
)
module.exports = strategy
