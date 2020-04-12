const router = require('express').Router(); 
let User = require('../models/user.model'); 

//User Signup"
router.post('/', (req,res) => {
    const { username, password } = req.body; 

    //Validation 
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } 
        else if (user) {
            res.json({error: `Sorry, already a user with the username: ${username}`})
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, result) => {
                if (err) {
                    return res.json(err); 
                }
                res.json(result);
            })
        }
    });
});


module.exports = router; 