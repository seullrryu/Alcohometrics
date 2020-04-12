const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const drinkSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, required: true},
    drinks: {type: Object, required: true},
    drunk: {type: Boolean, required: true}, 
    alcohol: {type: Number, required: true}
}); 
const Drinks = mongoose.model('Drinks', drinkSchema)
module.exports = Drinks;