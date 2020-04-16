const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true }, 
    records: {type: mongoose.Schema.Types.ObjectId, ref: "Drinks"}
});
userSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
};

//Before mongoose saves a document in the database, hash the password
userSchema.pre('save', function(next) {
	if (this.password) {
		console.log('password being hashed');
		this.password = this.hashPassword(this.password);
		next();
    } 
    else {
		console.log('No password provided');
		next();
	}
});



const User = mongoose.model('User', userSchema)
module.exports = User;