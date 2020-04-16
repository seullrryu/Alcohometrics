const router = require('express').Router(); 
const passport = require('../passport');
let User = require('../models/user.model'); 

//User Signup"
router.post('/', (req,res) => {
    const { username, password } = req.body; 

    //Validation 
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('Post error: ', err)
        } 
        else if (user) {
            console.log("This user exists");
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

router.post("/login", (req,res,next) => {
        console.log("Backend /login: ", req.body); 
        next(); 
    }, 
    passport.authenticate("local"), (req,res) => {
        console.log(res.user);
        console.log("User is logged in!"); 
        let info = {username: req.user.username}; 
        res.send(info); 
    }
)

module.exports = router; 