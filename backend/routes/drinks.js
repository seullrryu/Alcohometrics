const router = require('express').Router(); 
let Drinks = require('../models/drinks.model'); 
let User = require('../models/user.model'); 

router.post('/', (req,res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
        if (error) {
            console.log("Error");
        }
        else if (user) {
            console.log(user);
            const newDrinks = new Drinks({
                user: user._id, 
                date: req.body.date, 
                drinks: req.body.drinks, 
                drunk: req.body.drunk, 
                alcohol: req.body.alcohol
            })
            console.log(newDrinks);
            newDrinks.save((err, result) => {
                if (err) {
                    return res.json(err); 
                }
                res.json(result);
            })
            user.records.push(newDrinks._id);
            console.log(user);
        }
    })
}); 

module.exports = router;