const express = require('express')
const router = express.Router()
const passport = require('../passport');
let User = require('../models/user.model'); 

//Find data
router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } 
    else {
        res.json({ user: null })
    }
});
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

// router.post("/login", (req,res,next) => {
//         console.log("Backend post request /login: ", req.body); 
//         next(); 
//     }, 
//     passport.authenticate("local"), (req,res) => {
//         console.log("User is logged in!"); 
//         console.log("Hello", req.user);
//         let info = {username: req.user.username}; 
//         res.send(info); 
//     }
// )
router.post('/login', function (req, res, next) {
        console.log(req.body)
        next()
    },
    passport.authenticate('local'), (req, res) => {
        console.log('Authenticated, ', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)

module.exports = router; 