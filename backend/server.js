const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose'); //helps us connect to our mongodb database 

require("dotenv").config(); //configures so we have can have our environment variables in the dotenv file

const app = express();

app.use(cors());
app.use(express.json()); //allow us to parse json 

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex: true}); 
const connection = mongoose.connection; 
connection.once("open", () => {
    console.log("MongoDB Database connection established.");
})

const usersRouter = require("./routes/users"); 
// const drinksRouter = require("./routes/drinks"); 


app.use('/users', usersRouter); 
// app.use('/drinks', drinksRouter);

app.listen(5000, () => {
    console.log("server is running on port 5000");
});
