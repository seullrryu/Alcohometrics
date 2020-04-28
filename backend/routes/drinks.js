const router = require('express').Router(); 
let Drinks = require('../models/drinks.model'); 
let User = require('../models/user.model'); 


router.get('/getDrinks', (req,res) => {
    //get filtered drinks
    User.findOne({ username: req.query.username }, (error, user) => {
        if (error) {
            console.log("Error");
        }
        else if (user) {
            let result; 
            if (req.query.drink === 'beer') {
                if (req.query.operator === '>') {
                    result = user.records.filter(record => record.drinks.beer > req.query.limit);
                }
                else if (req.query.operator === '<') {
                    result = user.records.filter(record => record.drinks.beer < req.query.limit);
                } 
                else if (req.query.operator === '==') {
                    result = user.records.filter(record => record.drinks.beer == req.query.limit);
                }
            }
            else if (req.query.drink === 'soju') {
                if (req.query.operator === '>') {
                    result = user.records.filter(record => record.drinks.soju > req.query.limit);
                }
                else if (req.query.operator === '<') {
                    result = user.records.filter(record => record.drinks.soju < req.query.limit);
                } 
                else if (req.query.operator === '==') {
                    result = user.records.filter(record => record.drinks.soju == req.query.limit);
                }
            }
            else if (req.query.drink === 'mixed') {
                if (req.query.operator === '>') {
                    result = user.records.filter(record => record.drinks.mixed > req.query.limit);
                }
                else if (req.query.operator === '<') {
                    result = user.records.filter(record => record.drinks.mixed < req.query.limit);
                } 
                else if (req.query.operator === '==') {
                    result = user.records.filter(record => record.drinks.mixed == req.query.limit);
                }
            }
            else if (req.query.drink === 'vodka') {
                if (req.query.operator === '>') {
                    result = user.records.filter(record => record.drinks.vodka > req.query.limit);
                }
                else if (req.query.operator === '<') {
                    result = user.records.filter(record => record.drinks.vodka < req.query.limit);
                } 
                else if (req.query.operator === '==') {
                    result = user.records.filter(record => record.drinks.vodka == req.query.limit);
                }
            }
            console.log(result);
            res.json(result);
        }
    });
})

router.post('/', (req,res) => {
    const username = req.body.username; 
    User.findOne({ username: username }, (error, user) => {
        if (error) {
            console.log("Error");
        }
        //if user exists
        else if (user) {
            console.log(user);
            const newDrinks = new Drinks({
                user: user._id, 
                date: req.body.date, 
                drinks: req.body.drinks, 
                drunk: req.body.drunk, 
                alcohol: req.body.alcohol
            })
            console.log("This the new drinks:", newDrinks);

            const userID = user._id; 
            User.update({ _id: userID }, {$push:{records: newDrinks}},
                function(err,success) {
                    if (error) {
                        console.log("Error:", err); 
                    }
                    else {
                        console.log("Success:", success);
                    }
                }
            )
        }
    });
}); 


module.exports = router;