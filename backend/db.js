const mongoose = require('mongoose'); 
// my schema goes here!
const User = new mongoose.Schema({
    // username provided by authentication plugin
    // password hash provided by authentication plugin
    records:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Records' }]
});

const Records = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    date: {type: Date, required: true},
    drinks: {type:Object, required:true},
    drunk: {type:Boolean, required:true}, 
    alcoholAmt: {type: Number, required:true}
});
   
