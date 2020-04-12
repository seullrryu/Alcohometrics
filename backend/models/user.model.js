const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trim:true, minlength:3 },
    password: { type: String, required: true }, 
    records: {type: mongoose.Schema.Types.ObjectId, ref: "Drinks"}
})

const User = mongoose.model('User', userSchema)
module.exports = User;